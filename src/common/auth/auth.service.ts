import {
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { hash, verify } from 'argon2'
import { plainToInstance } from 'class-transformer'
import { UUID } from 'crypto'

import { PrismaService } from '@/root/prisma'
import { EmailService } from '../email/email.service'
import { UserDto } from '../user/dto/user.response'
import { UserService } from '../user/user.service'
import {
	LoginDto,
	RefreshTokenDto,
	RegisterDto,
	VerifyOtpDto
} from './dto/auth.request'
import { AuthResponse, LoginResponse, TokenResponse } from './dto/auth.response'
import { JwtAuthService } from './jwt/jwt.service'

import { addMinutes } from 'date-fns'

@Injectable()
export class AuthService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly jwtService: JwtAuthService,
		private readonly userService: UserService,
		private readonly emailService: EmailService
	) {}

	async getProfile(id: UUID): Promise<UserDto> {
		return await this.userService.getById(id)
	}

	async register(dto: RegisterDto): Promise<UserDto | null> {
		const newUser = await this.prismaService.user.create({
			data: {
				...dto,
				password: await hash(dto.password)
			}
		})

		return plainToInstance(UserDto, newUser)
	}

	async login(dto: LoginDto): Promise<LoginResponse> {
		const user = await this.validateUser(dto)
		const otpCode = this.generateOtpCode()

		await this.prismaService.user.update({
			where: { id: user.id },
			data: {
				otpCode: otpCode,
				otpExpiresAt: addMinutes(new Date(), 1)
			}
		})

		await this.emailService.sendOtpEmail({
			toEmail: user.email,
			username: user.username,
			code: otpCode
		})

		return {
			userId: user.id
		}
	}

	async refreshToken(dto: RefreshTokenDto): Promise<TokenResponse> {
		const tokens = await this.jwtService.getNewTokens(dto)
		return tokens
	}

	async verifyOtp(dto: VerifyOtpDto): Promise<AuthResponse> {
		const user = await this.prismaService.user.findUnique({
			where: { id: dto.userId }
		})

		if (!user) {
			throw new NotFoundException('User not found!')
		}

		if (user.otpCode !== dto.otpCode) {
			throw new UnauthorizedException('Invalid OTP')
		}

		const isOtpExpired = user.otpExpiresAt && new Date() > user.otpExpiresAt
		if (isOtpExpired) {
			await this.clearOtpData(user.id)
			throw new UnauthorizedException('OTP has expired')
		}

		await this.clearOtpData(user.id)

		const tokens = await this.jwtService.generateTokens(user.id as UUID)

		return {
			user: plainToInstance(UserDto, user),
			token: tokens
		}
	}

	private async clearOtpData(userId: string): Promise<void> {
		await this.prismaService.user.update({
			where: { id: userId },
			data: {
				otpCode: null,
				otpExpiresAt: null
			}
		})
	}

	async validateUser(dto: LoginDto) {
		const user = await this.prismaService.user.findUnique({
			where: {
				username: dto.username?.toLowerCase()
			}
		})

		if (!user) throw new NotFoundException('User is not found!')

		const isValid = await verify(user?.password, dto.password)

		if (!isValid) {
			throw new UnauthorizedException('Invalid Credentials')
		}

		return plainToInstance(UserDto, user)
	}

	public generateOtpCode(): string {
		return Math.floor(100000 + Math.random() * 900000).toString()
	}
}

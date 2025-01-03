import { PrismaService } from '@/root/prisma'
import { Injectable } from '@nestjs/common'
import { randomBytes } from 'crypto'
import { LoginDto, RefreshTokenDto, RegisterDto } from './dto/auth.request'
import { AuthResponse } from './dto/auth.response'

@Injectable()
export class AuthService {
	constructor(private readonly prismaService: PrismaService) {}

	public login(dto: LoginDto): Promise<AuthResponse> {
		return null
	}

	public register(dto: RegisterDto): Promise<AuthResponse> {
		return null
	}

	public refreshToken(dto: RefreshTokenDto): Promise<AuthResponse> {
		return null
	}

	public createOTPCode(): string {
		const buffer = randomBytes(3)
		return ((parseInt(buffer.toString('hex'), 16) % 900000) + 100000).toString()
	}
}

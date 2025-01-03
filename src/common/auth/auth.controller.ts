import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { UserDto } from '../user/dto/user.response'
import { AuthService } from './auth.service'
import {
	LoginDto,
	RefreshTokenDto,
	RegisterDto,
	VerifyOtpDto
} from './dto/auth.request'
import { AuthResponse, LoginResponse, TokenResponse } from './dto/auth.response'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({ summary: 'Login' })
	@Post('/login')
	async login(@Body() dto: LoginDto): Promise<LoginResponse> {
		return this.authService.login(dto)
	}

	@ApiOperation({ summary: 'Register' })
	@Post('/register')
	async register(@Body() dto: RegisterDto): Promise<UserDto> {
		return this.authService.register(dto)
	}

	@ApiOperation({ summary: 'Refresh token' })
	@Post('/refresh-token')
	async refreshToken(@Body() dto: RefreshTokenDto): Promise<TokenResponse> {
		return this.authService.refreshToken(dto)
	}

	@ApiOperation({ summary: 'Verify OTP' })
	@Post('verify-otp')
	async verifyOtp(@Body() dto: VerifyOtpDto): Promise<AuthResponse> {
		return this.authService.verifyOtp(dto)
	}
}

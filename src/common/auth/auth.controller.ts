import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { LoginDto, RefreshTokenDto, RegisterDto } from './dto/auth.request'
import { AuthResponse } from './dto/auth.response'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({ summary: 'Login' })
	@Post('/login')
	async login(@Body() dto: LoginDto): Promise<AuthResponse> {
		return this.authService.login(dto)
	}

	@ApiOperation({ summary: 'Register' })
	@Post('/register')
	async register(@Body() dto: RegisterDto): Promise<AuthResponse> {
		return this.authService.register(dto)
	}

	@ApiOperation({ summary: 'Refresh token' })
	@Post('/refresh-token')
	async refreshToken(@Body() dto: RefreshTokenDto): Promise<AuthResponse> {
		return this.authService.refreshToken(dto)
	}
}

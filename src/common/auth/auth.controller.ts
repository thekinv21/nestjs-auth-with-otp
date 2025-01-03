import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto, RefreshTokenDto, RegisterDto } from './dto/auth.request'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('/login')
	async login(@Body() dto: LoginDto) {
		return this.authService.login(dto)
	}

	@Post('/register')
	async register(@Body() dto: RegisterDto) {
		return this.authService.register(dto)
	}

	@Post('/refresh-token')
	async refreshToken(@Body() dto: RefreshTokenDto) {
		return this.authService.refreshToken(dto)
	}
}

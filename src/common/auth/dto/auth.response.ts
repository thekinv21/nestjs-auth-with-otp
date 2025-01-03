import { UserDto } from '../../user/dto/user.response'

export class AuthResponse {
	accessToken: string
	refreshToken: string
	accessTokenExpiresIn: Date
	user: UserDto
}

export class TokenResponse {
	accessToken: string
	refreshToken: string
	accessTokenExpiryDate: string
	refreshTokenExpiryDate: string
}

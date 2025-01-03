import { UserDto } from '../../user/dto/user.response'

export class AuthResponse {
	token: TokenResponse
	user: UserDto
}

export class TokenResponse {
	accessToken: string
	refreshToken: string
	accessTokenExpiryDate: string
	refreshTokenExpiryDate: string
}

import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { UUID } from 'crypto'

import { UserService } from '../../user/user.service'
import { RefreshTokenDto } from '../dto/auth.request'
import { TokenResponse } from '../dto/auth.response'

@Injectable()
export class JwtAuthService {
	constructor(
		private readonly configService: ConfigService,
		private readonly jwt: JwtService,
		private readonly userService: UserService
	) {}

	async generateTokens(userId: UUID) {
		const accessToken = this.jwt.sign(
			{ id: userId },
			{
				expiresIn: this.configService.get('JWT_EXPIRED'),
				secret: this.configService.get('JWT_SECRET')
			}
		)

		const refreshToken = this.jwt.sign(
			{ id: userId },
			{
				expiresIn: this.configService.get('JWT_REFRESH_EXPIRED'),
				secret: this.configService.get('JWT_SECRET')
			}
		)

		const accessTokenExpiryDate =
			this.jwt?.decode(accessToken)?.exp ??
			new Date(this.jwt.decode(accessToken)?.exp * 1000).toISOString()

		const refreshTokenExpiryDate =
			this.jwt?.decode(refreshToken)?.exp ??
			new Date(this.jwt.decode(refreshToken)?.exp * 1000).toISOString()

		const token: TokenResponse = {
			accessToken,
			refreshToken,
			accessTokenExpiryDate,
			refreshTokenExpiryDate
		}

		return token
	}

	async getNewTokens(dto: RefreshTokenDto): Promise<TokenResponse> {
		const result = await this.jwt.verifyAsync(dto.refreshToken, {
			secret: this.configService.get('JWT_SECRET')
		})

		if (!result) {
			throw new BadRequestException('Invalid Refresh Token!')
		}

		const user = await this.userService.getById(result?.id)
		const newTokens = await this.generateTokens(user.id as UUID)

		return newTokens
	}
}

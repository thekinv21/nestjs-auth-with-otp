import { Module } from '@nestjs/common'
import { JwtAuthService } from './jwt.service'

@Module({
	providers: [JwtAuthService],
	exports: [JwtAuthService]
})
export class JwtAuthModule {}

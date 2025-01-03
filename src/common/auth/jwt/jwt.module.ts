import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { UserModule } from '../../user/user.module'
import { JwtAuthService } from './jwt.service'

@Module({
	imports: [ConfigModule, JwtModule, UserModule],
	providers: [JwtAuthService],
	exports: [JwtAuthService]
})
export class JwtAuthModule {}

import { PrismaService } from '@/root/prisma'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { UserService } from '../user/user.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { getJwtConfig } from './jwt/jwt.config'
import { JwtAuthModule } from './jwt/jwt.module'

@Module({
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		}),
		JwtAuthModule
	],
	controllers: [AuthController],
	providers: [AuthService, PrismaService, UserService],
	exports: [AuthService]
})
export class AuthModule {}

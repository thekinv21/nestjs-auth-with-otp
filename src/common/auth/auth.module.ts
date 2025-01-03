import { PrismaService } from '@/root/prisma'
import { Module } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
	imports: [],
	controllers: [AuthController],
	providers: [AuthService, PrismaService, UserService],
	exports: [AuthService]
})
export class AuthModule {}

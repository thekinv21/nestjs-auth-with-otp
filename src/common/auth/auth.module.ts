import { PrismaService } from '@/root/prisma'
import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
	imports: [],
	controllers: [AuthController],
	providers: [AuthService, PrismaService],
	exports: [AuthService]
})
export class AuthModule {}

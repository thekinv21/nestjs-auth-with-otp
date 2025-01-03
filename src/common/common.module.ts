import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { EmailModule } from './email/email.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		EmailModule,
		AuthModule,
		UserModule
	],
	controllers: [],
	providers: [],
	exports: []
})
export class CommonModule {}

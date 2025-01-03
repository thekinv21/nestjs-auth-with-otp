import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { EmailModule } from './email/email.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		EmailModule,
		AuthModule
	],
	controllers: [],
	providers: [],
	exports: []
})
export class CommonModule {}

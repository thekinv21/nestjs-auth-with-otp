import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { OtpService } from './otp/otp.service'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		})
	],
	controllers: [],
	providers: [],
	exports: [OtpService]
})
export class CommonModule {}

import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { OtpService } from './otp/otp.service'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		})
	],
	controllers: [AppController],
	providers: [AppService, OtpService]
})
export class AppModule {}

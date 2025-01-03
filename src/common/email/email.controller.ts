import { Body, Controller, Post } from '@nestjs/common'
import { OtpEmailRequestDto } from './dto/email.request'
import { EmailService } from './email.service'

@Controller('email')
export class EmailController {
	constructor(private readonly emailService: EmailService) {}

	@Post('/send-otp')
	async sendEmail(@Body() dto: OtpEmailRequestDto) {
		return this.emailService.sendOtpEmail(dto)
	}
}

import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { OtpEmailRequestDto } from './dto/email.request'
import { EmailService } from './email.service'

@Controller('email')
export class EmailController {
	constructor(private readonly emailService: EmailService) {}

	@ApiOperation({ summary: 'Send OTP code to email' })
	@Post('/send-otp')
	async sendEmail(@Body() dto: OtpEmailRequestDto) {
		return this.emailService.sendOtpEmail(dto)
	}
}

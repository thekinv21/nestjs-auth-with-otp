import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ServerClient } from 'postmark'

import { OtpEmailRequestDto } from './dto/email.request'

@Injectable()
export class EmailService {
	private readonly postMarkClient: ServerClient

	constructor(private readonly configService: ConfigService) {
		this.postMarkClient = new ServerClient(
			this.configService.get<string>('POSTMARK_API_KEY')
		)
	}

	async sendOtpEmail(dto: OtpEmailRequestDto) {
		try {
			const response = await this.postMarkClient.sendEmailWithTemplate({
				From: this.configService.get('POSTMARK_FROM_EMAIL'),
				To: dto.toEmail,
				TemplateId: this.configService.get<number>('POSTMARK_OTP_TEMPLATE_ID'),
				TemplateModel: {
					code: dto.code,
					username: dto.username
				}
			})

			if (response.Message === 'OK' && response.ErrorCode === 0) {
				return true
			}
			throw new BadRequestException(
				'Something went wrong when sending OTP email',
				response.Message
			)
		} catch (error) {
			throw new BadRequestException('Failed to send email', error)
		}
	}
}

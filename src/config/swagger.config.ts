import { DocumentBuilder } from '@nestjs/swagger'

export const swagger = new DocumentBuilder()
	.setTitle('Auth with OTP')
	.setDescription('API Documentation for Auth with OTP')
	.setVersion('1.0')
	.addBearerAuth(
		{
			type: 'http',
			scheme: 'bearer',
			bearerFormat: 'JWT',
			in: 'header',
			description: 'JWT Authorization for Access'
		},
		'access-token'
	)
	.build()

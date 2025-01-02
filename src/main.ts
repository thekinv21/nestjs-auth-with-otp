import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import * as dotenv from 'dotenv'

import { SwaggerModule } from '@nestjs/swagger'
import { ApiResponseInterceptor, GlobalExceptionFilter } from './base'
import { swagger } from './config'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.setGlobalPrefix('api')
	app.useGlobalFilters(new GlobalExceptionFilter())
	app.useGlobalInterceptors(new ApiResponseInterceptor())

	SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, swagger))

	await app.listen(process.env.PORT || 4200)

	dotenv.config()
}
bootstrap()

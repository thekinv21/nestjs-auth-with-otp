import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import * as dotenv from 'dotenv'

import { SwaggerModule } from '@nestjs/swagger'
import { swagger } from './config'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, swagger))

	await app.listen(process.env.PORT || 5200)

	dotenv.config()
}
bootstrap()

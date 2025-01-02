import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus
} from '@nestjs/common'
import { Request, Response } from 'express'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()
		const request = ctx.getRequest<Request>()

		if (response?.headersSent) {
			return
		}

		const status =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR

		let exceptionMessage = exception?.message
		let customMessage: string | Array<{ message: string }> = exceptionMessage

		if (exception && exception?.name === 'BadRequestException') {
			const exceptionResponse = exception.getResponse()
			if (
				typeof exceptionResponse === 'object' &&
				'message' in exceptionResponse
			) {
				const message = exceptionResponse['message']
				if (Array.isArray(message)) {
					customMessage = message.map((msg: string) => ({
						message: msg
					}))
				} else {
					customMessage = message as string
				}
			}
		}

		response.status(status).json({
			isSuccess: false,
			status,
			path: request.url,
			message: customMessage,
			exception: exception?.name ? exception?.name : exception,
			timestamp: new Date().toISOString()
		})
	}
}

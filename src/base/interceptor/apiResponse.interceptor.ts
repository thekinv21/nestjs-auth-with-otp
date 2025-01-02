import {
	CallHandler,
	ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
	NestInterceptor
} from '@nestjs/common'
import { Observable, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { IApiResponse, IPaginationApiResponse } from '../../types/common.types'

export type TypeApiResponseInterceptor<T> =
	| IApiResponse<T>
	| IPaginationApiResponse<T>

@Injectable()
export class ApiResponseInterceptor<T>
	implements NestInterceptor<T, TypeApiResponseInterceptor<T>>
{
	intercept(
		context: ExecutionContext,
		next: CallHandler
	): Observable<TypeApiResponseInterceptor<T>> {
		return next.handle().pipe(
			map((res: T | T[] | IPaginationApiResponse<T>) =>
				this.handleResponse(res, context)
			),
			catchError((error: HttpException) =>
				throwError(() => this.handleError(error, context))
			)
		)
	}

	private handleError(exception: HttpException, context: ExecutionContext) {
		const response = context.switchToHttp().getResponse()
		const req = context.switchToHttp().getRequest()
		const status =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR

		let message: string | Array<{ message: string }> = exception.message

		if (exception.name === 'BadRequestException') {
			const errorResponse = exception.getResponse()
			if (typeof errorResponse === 'object' && 'message' in errorResponse) {
				message = Array.isArray(errorResponse['message'])
					? errorResponse['message'].map((msg: string) => ({
							message: msg
						}))
					: (errorResponse['message'] as string)
			}
		}

		response.status(status).json({
			isSuccess: false,
			status,
			path: req.url,
			message,
			exception: exception.name,
			timestamp: new Date().toISOString()
		})
	}

	private handleResponse(
		res: T | T[] | IPaginationApiResponse<T>,
		context: ExecutionContext
	): TypeApiResponseInterceptor<T> {
		const response = context.switchToHttp().getResponse()
		const req = context.switchToHttp().getRequest()

		const page = parseInt(req.query.page, 0)
		const pageSize = parseInt(req.query.pageSize, 10)
		const status = response.statusCode

		if (res && res['total']) {
			const totalPages = Math.ceil(res['total'] / pageSize)
			return {
				isSuccess: true,
				status,
				path: req.url,
				timestamp: new Date().toISOString(),
				total: res['total'],
				page,
				pageSize,
				isFirstPage: page === 0,
				isLastPage: page === totalPages - 1,
				isEmpty: res['content']?.length > 0 ? false : true,
				totalPages: totalPages,
				content: res['content']
			} as IPaginationApiResponse<T>
		}

		return {
			isSuccess: true,
			status,
			path: req.url,
			timestamp: new Date().toISOString(),
			content: res
		} as IApiResponse<T>
	}
}

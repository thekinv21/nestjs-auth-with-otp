import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsNumber, IsOptional, IsString, Min } from 'class-validator'

export class PaginationParams {
	@ApiProperty({
		example: 0,
		title: 'page'
	})
	@Transform(({ value }) => Number(value))
	@IsNumber()
	@Min(0)
	page: number

	@ApiProperty({
		example: 10,
		title: 'pageSize'
	})
	@Transform(({ value }) => Number(value))
	@IsNumber()
	@Min(1)
	pageSize: number

	@ApiProperty({
		example: 'James',
		title: 'searchBy',
		required: false
	})
	@IsOptional()
	@IsString()
	searchTerm?: string

	@ApiProperty({
		example: 'firstName',
		title: 'orderBy',
		required: false
	})
	@IsOptional()
	@IsString()
	orderBy?: string

	@ApiProperty({
		example: 'desc',
		title: 'direction',
		required: false
	})
	@IsOptional()
	@IsString()
	direction?: 'asc' | 'desc'
}

export class PaginationDto<T> {
	total: number
	content: T
}

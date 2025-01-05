import { ApiProperty } from '@nestjs/swagger'
import {
	IsBoolean,
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	MinLength
} from 'class-validator'
import { UUID } from 'crypto'

export class UserCreateDto {
	@ApiProperty({
		description: 'The username of the user',
		example: 'john_doe',
		required: true
	})
	@IsString()
	@IsNotEmpty({
		message: 'Username is required'
	})
	username: string

	@ApiProperty({
		description: 'The email address of the user',
		example: 'john.doe@example.com',
		required: true
	})
	@IsEmail()
	@IsNotEmpty({
		message: 'Email is required'
	})
	email: string

	@ApiProperty({
		description: 'The password for the user',
		minLength: 6,
		example: 'pass',
		required: true
	})
	@IsString()
	@IsNotEmpty({
		message: 'Password is required'
	})
	@MinLength(6, {
		message: 'Password must be at least 6 characters long'
	})
	password: string

	@ApiProperty({
		description: 'The first name of the user',
		example: 'John',
		required: false
	})
	@IsOptional()
	firstName?: string

	@ApiProperty({
		description: 'The last name of the user',
		example: 'Doe',
		required: false
	})
	@IsOptional()
	lastName?: string

	@ApiProperty({
		description: 'The status of the user (active or inactive)',
		example: true
	})
	@IsBoolean()
	@IsOptional()
	isActive: boolean
}

export class UserUpdateDto {
	@ApiProperty({
		description: 'The ID of the user',
		example: '1234567890'
	})
	@IsString()
	@IsNotEmpty({
		message: 'ID is required'
	})
	id: UUID
}

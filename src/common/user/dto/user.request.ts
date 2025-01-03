import { OmitType } from '@nestjs/swagger'
import {
	ArrayNotEmpty,
	IsArray,
	IsEmail,
	IsNotEmpty,
	IsString,
	MinLength
} from 'class-validator'

export class UserCreateDto {
	@IsString()
	@IsNotEmpty({
		message: 'Username is required'
	})
	username: string

	@IsEmail()
	@IsNotEmpty({
		message: 'Email is required'
	})
	email: string

	@IsString()
	@IsNotEmpty({
		message: 'Password is required'
	})
	@MinLength(6, {
		message: 'Password must be at least 6 characters long'
	})
	password: string
	firstName?: string
	lastName?: string

	@IsArray()
	@ArrayNotEmpty({ message: 'Role array cannot be empty' })
	@IsString({ each: true, message: 'Each role must be a string' })
	role: string[]
}

export class UserUpdateDto extends OmitType(UserCreateDto, [
	'password'
] as const) {}

import { ApiProperty } from '@nestjs/swagger'
import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsUUID,
	MaxLength,
	MinLength
} from 'class-validator'

export class LoginDto {
	@ApiProperty({
		description: 'Username',
		example: 'admin',
		required: true
	})
	@IsString()
	@IsNotEmpty({
		message: 'Username is required'
	})
	username: string

	@ApiProperty({
		description: 'Password',
		example: '*********',
		required: true
	})
	@IsString()
	@IsNotEmpty({
		message: 'Password is required'
	})
	password: string
}

export class RegisterDto {
	@ApiProperty({
		description: 'First name',
		example: 'John'
	})
	@IsString()
	@IsOptional()
	firstName: string

	@ApiProperty({
		description: 'Last name',
		example: 'Doe'
	})
	@IsString()
	@IsOptional()
	lastName?: string

	@ApiProperty({
		description: 'Username',
		example: 'admin',
		required: true
	})
	@IsString()
	@IsNotEmpty({
		message: 'Username is required'
	})
	username: string

	@ApiProperty({
		description: 'Email',
		example: 'johndoe@gmail.com',
		required: true
	})
	@IsEmail()
	@IsNotEmpty({
		message: 'Email is required'
	})
	email: string

	@ApiProperty({
		description: 'Password',
		example: '*********',
		required: true
	})
	@IsString()
	@IsNotEmpty({
		message: 'Password is required'
	})
	password: string

	@ApiProperty({
		description: 'Status of the user',
		required: false
	})
	isActive?: boolean
}

export class RefreshTokenDto {
	@ApiProperty({
		description: 'Refresh token',
		example: '	970e933acf4f60a1e8d1188f788c8f1003e998b2eee3ee28559c43f6f05d32b3',
		required: true
	})
	@IsString()
	@IsNotEmpty({
		message: 'Refresh token is required'
	})
	refreshToken: string
}

export class VerifyOtpDto {
	@ApiProperty({
		description: 'User ID',
		required: true,
		example: 'd2d6b1b9-7b9e-4a3b-9f1b-1e5b7b7f6d7b'
	})
	@IsUUID()
	@IsNotEmpty({
		message: 'UserId is required'
	})
	userId: string

	@ApiProperty({
		description: 'OTP',
		required: true,
		example: '123456'
	})
	@IsString()
	@IsNotEmpty({
		message: 'OTP is required'
	})
	@MinLength(6)
	@MaxLength(6)
	otpCode: string
}

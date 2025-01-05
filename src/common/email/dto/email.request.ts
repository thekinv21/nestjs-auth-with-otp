import { ApiProperty } from '@nestjs/swagger'
import {
	IsEmail,
	IsNotEmpty,
	IsString,
	MaxLength,
	MinLength
} from 'class-validator'

export class OtpEmailRequestDto {
	@ApiProperty({
		description: 'Email to send OTP code',
		example: 'john_doe@gmail.com'
	})
	@IsEmail()
	@IsNotEmpty({
		message: 'Email is required'
	})
	toEmail: string

	@ApiProperty({
		description: 'OTP code',
		example: '123456'
	})
	@IsString()
	@MinLength(6)
	@MaxLength(6)
	@IsNotEmpty({
		message: 'OTP code is required'
	})
	code: string

	@ApiProperty({
		description: 'Username of user',
		example: 'john_doe'
	})
	@IsString()
	@IsNotEmpty()
	username: string
}

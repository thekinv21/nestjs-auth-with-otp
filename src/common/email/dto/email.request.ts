import {
	IsEmail,
	IsNotEmpty,
	IsString,
	MaxLength,
	MinLength
} from 'class-validator'

export class OtpEmailRequestDto {
	@IsEmail()
	@IsNotEmpty({
		message: 'Email is required'
	})
	toEmail: string

	@IsString()
	@MinLength(6)
	@MaxLength(6)
	@IsNotEmpty({
		message: 'OTP code is required'
	})
	code: string

	@IsString()
	@IsNotEmpty()
	fullName: string
}

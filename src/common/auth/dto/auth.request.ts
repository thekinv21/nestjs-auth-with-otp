import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class LoginDto {
	@IsString()
	@IsNotEmpty({
		message: 'Username is required'
	})
	username: string

	@IsString()
	@IsNotEmpty({
		message: 'Password is required'
	})
	password: string
}

export class RegisterDto {
	@IsString()
	firstName: string

	@IsString()
	lastName: string

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
	password: string
}

export class RefreshTokenDto {
	@IsString()
	@IsNotEmpty({
		message: 'Refresh token is required'
	})
	refreshToken: string
}

import { Exclude } from 'class-transformer'
import { UUID } from 'crypto'

export class UserDto {
	id: UUID
	username: string
	email: string
	firstName: string
	lastName: string
	isActive: boolean
	@Exclude()
	password: string
	createdAt: Date
	updatedAt: Date
}

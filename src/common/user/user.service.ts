import { PrismaService } from '@/root/prisma'
import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { UserCreateDto, UserUpdateDto } from './dto/user.request'
import { UserDto } from './dto/user.response'

@Injectable()
export class UserService {
	constructor(private readonly prismaService: PrismaService) {}

	public async getAll(): Promise<UserDto[]> {
		const users = await this.prismaService.user.findMany()
		return plainToInstance(UserDto, users)
	}

	public async getById(id: string): Promise<UserDto> {
		const user = await this.prismaService.user.findUnique({
			where: {
				id: id
			}
		})
		return plainToInstance(UserDto, user)
	}

	public async create(dto: UserCreateDto): Promise<UserDto> {
		const newUser = await this.prismaService.user.create({
			data: dto
		})
		return plainToInstance(UserDto, newUser)
	}

	public async update(dto: UserUpdateDto): Promise<UserDto> {
		const updatedUser = await this.prismaService.user.update({
			where: {
				id: dto.id
			},
			data: dto
		})
		return plainToInstance(UserDto, updatedUser)
	}

	public async delete(id: string): Promise<void> {
		await this.prismaService.user.delete({
			where: {
				id: id
			}
		})
	}

	public async toggle(id: string): Promise<void> {
		const user = await this.getById(id)
		await this.prismaService.user.update({
			where: {
				id: id
			},
			data: {
				isActive: !user.isActive
			}
		})
	}
}

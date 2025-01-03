import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Put
} from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { UserCreateDto, UserUpdateDto } from './dto/user.request'
import { UserDto } from './dto/user.response'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@ApiOperation({ summary: 'Get all users' })
	@Get()
	public async getAll(): Promise<UserDto[]> {
		return this.userService.getAll()
	}

	@ApiOperation({ summary: 'Get user by ID' })
	@Get(':id')
	public async getById(@Param('id') id: string): Promise<UserDto> {
		return this.userService.getById(id)
	}

	@ApiOperation({ summary: 'Create a new user' })
	@Post()
	public async create(@Body() dto: UserCreateDto): Promise<UserDto> {
		return this.userService.create(dto)
	}

	@ApiOperation({ summary: 'Update an existing user' })
	@Put()
	public async update(@Body() dto: UserUpdateDto): Promise<UserDto> {
		return this.userService.update(dto)
	}

	@ApiOperation({ summary: 'Delete user by ID' })
	@Delete(':id')
	public async delete(@Param('id') id: string): Promise<void> {
		return this.userService.delete(id)
	}

	@ApiOperation({ summary: 'Toggle user status' })
	@Patch(':id')
	public async toggle(@Param('id') id: string): Promise<void> {
		return this.userService.toggle(id)
	}
}

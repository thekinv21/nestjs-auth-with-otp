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
import { UserCreateDto, UserUpdateDto } from './dto/user.request'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	public async getAll() {
		return this.userService.getAll()
	}

	@Get(':id')
	public async getById(@Param('id') id: string) {
		return this.userService.getById(id)
	}

	@Post()
	public async create(@Body() dto: UserCreateDto) {
		return this.userService.create(dto)
	}

	@Put()
	public async update(@Body() dto: UserUpdateDto) {
		return this.userService.update(dto)
	}

	@Delete(':id')
	public async delete(@Param('id') id: string) {
		return this.userService.delete(id)
	}

	@Patch(':id')
	public async toggle(@Param('id') id: string) {
		return this.userService.toggle(id)
	}
}

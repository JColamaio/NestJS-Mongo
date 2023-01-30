import { Body, Controller, Post } from '@nestjs/common'
import { CreateUserRequest } from './dto/create-user-request';
import { UserService } from './users.service'

@Controller('auth/users')
export class UsersController {
    constructor(private readonly usersService: CreateUserRequest) {}

    @Post()
    async createUser(@Body() request: CreateUserRequest) {
        return this.usersService.createUser(request)
    }
}
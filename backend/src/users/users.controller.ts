import { Controller, Post, Body, BadRequestException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        try {
            return await this.usersService.create(createUserDto);
        } catch (error: any) {
            console.error('Register error:', error);
            throw new BadRequestException(error.message);
        }
    }

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        try {
            return await this.usersService.login(body.email, body.password);
        } catch (error: any) {
            console.error('Login error:', error);
            throw new BadRequestException(error.message);
        }
    }
}
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, User as UserModel } from 'generated/prisma';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post()
    async signupUser(
        @Body() userData: Prisma.UserCreateInput,
    ): Promise<UserModel> {
        return this.userService.createUser(userData);
    }

    @Get(':id')
    async getUser(
        @Param('id') id: string
    ): Promise<UserModel | null> {
        const user = await this.userService.user({ id: Number(id) });
        return user;
    }

    @Put()
    async updateUser(
        @Body() userData: Prisma.UserUpdateInput,
        @Param('id') id: string,
    ): Promise<UserModel> {
        return this.userService.updateUser({
            where: { id: Number(id) },
            data: userData,
        });
    }

    @Delete(':id')
    async deleteUser(
        @Param('id') id: string,
    ): Promise<UserModel> {
        return this.userService.deleteUser({ id: Number(id) });
    }
}

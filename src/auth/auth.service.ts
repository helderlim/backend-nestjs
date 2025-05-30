import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    @Inject()
    private readonly userService: UserService;

    async signIn(params: Prisma.UserCreateInput): Promise<Omit<User, 'password'>> {
        const user = await this.userService.user({ email: params.email });

        if (!user) throw new NotFoundException('User not found');

        const isPasswordMatch = await bcrypt.compare(params.password, user.password);

        if (!isPasswordMatch) throw new UnauthorizedException('Invalid credentials');

        const { password, ...result} = user;

        return result;
    }

}

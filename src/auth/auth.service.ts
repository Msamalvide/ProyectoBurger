import { Injectable } from '@nestjs/common';
import { JwtService } from 'node_modules/@nestjs/jwt/dist/jwt.service';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    singUp(registerUserDto: RegisterDto) {
        return this.userService.create(registerUserDto);
    }

}


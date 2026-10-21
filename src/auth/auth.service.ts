import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from 'node_modules/@nestjs/jwt/dist/jwt.service';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto/register.dto';
import { User } from '../user/entities/user.entity';
import {LoginDto} from '../auth/dto/login.dto/login.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async singUp(registerUserDto: RegisterDto) {
        const user: User = await this.userService.create(registerUserDto);
        const {password,...rest}= user;
        return rest;
    }

    async login (credentials:LoginDto){
        
        const user: User | null = await this.userService.findByEmail(credentials.email);
        if(!user){
            throw new ConflictException('Credenciales inválidas');
        }
        const compare = await bcrypt.compare(credentials.password, user.password);
        if(!compare){
            throw new ConflictException('Credenciales inválidas');
        }

        return this.generateToken(user)

    }


    private generateToken (user: User){
        const payload = { id: user.id, email: user.email, role: user.role };
        return {access_token: this.jwtService.sign(payload)};
    }

}


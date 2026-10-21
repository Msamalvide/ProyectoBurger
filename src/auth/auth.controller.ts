import { Controller, Post, UseGuards } from '@nestjs/common';
import {AuthService} from './auth.service'
import {RegisterDto} from './dto/register.dto/register.dto'
import { ApiResponse } from '@nestjs/swagger';
import { Body } from '@nestjs/common';
import { LoginDto } from './dto/login.dto/login.dto';
import { Roles } from '../decorators/Roles.decorator';
import { userRole } from '../enums/rol';
import { UserRoleGuard } from '../guards/user.role.guard';
import { JwtAuthGuard } from '../guards/jwt.auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService ) {}

    @ApiResponse({
        status: 201
    })
    @Post('/singUp')
    @Roles(userRole.admin)
    @UseGuards(JwtAuthGuard, UserRoleGuard)
    postSingUp(@Body() registerUserDto: RegisterDto) {
        return this.authService.singUp(registerUserDto);
    }

    @ApiResponse({
        status:201
    })
    @Post('/login')
    postLogin(@Body() credentials: LoginDto) {
        return this.authService.login(credentials);
    }

}

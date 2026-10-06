import { Controller, Post } from '@nestjs/common';
import {AuthService} from './auth.service'
import {RegisterDto} from './dto/register.dto/register.dto'
import { ApiResponse } from '@nestjs/swagger';
import { Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService ) {}

    @ApiResponse({
        status: 201
    })
    @Post('/singUp')
    postSingUp(@Body() registerUserDto: RegisterDto) {
        return this.authService.singUp(registerUserDto);
    }

}

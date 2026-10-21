import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { JwtModule } from 'node_modules/@nestjs/jwt/dist/jwt.module';
import { jwtConfig } from '../config/jwtConfig';
import {JwtStrategy} from './strategies/jwt.strategy'

@Module({
  imports: [UserModule,
    JwtModule.register(jwtConfig)
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}

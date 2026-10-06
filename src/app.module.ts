import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './config/jwtConfig';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm]
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService:ConfigService)=> configService.get('typeorm')!
    }),

    JwtModule.register(jwtConfig),

    ProductsModule,

    AuthModule,

    UserModule


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

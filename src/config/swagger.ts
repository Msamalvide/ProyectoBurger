import {DocumentBuilder} from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
    .setTitle('Franz Burger API')
    .setDescription('API for Franz Burger')
    .setVersion('1.0')
    .addBearerAuth()
    .build();


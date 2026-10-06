import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { validatorConfig } from './config/pipes';
import { swaggerConfig } from './config/swagger';
import { SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  //Configuracion pipes
  app.useGlobalPipes (new ValidationPipe(validatorConfig))

  //Configuracion swagger
  const document= SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

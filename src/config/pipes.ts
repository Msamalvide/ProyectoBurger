import { ValidationPipeOptions } from "@nestjs/common";

export const validatorConfig: ValidationPipeOptions = {
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
}
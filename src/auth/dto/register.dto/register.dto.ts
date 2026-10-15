import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Match } from "src/decorators/Match.decorator";

export class RegisterDto {

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({example: 'user@example.com', description: 'The email of the user'})
    email!: string;

    @IsString()
    @MinLength(6)
    @ApiProperty({example: 'password123', description: 'The password of the user'})
    password!: string;

    @IsString()
    @MinLength(6)
    @ApiProperty({example: 'password123', description: 'Confirm the password'})
    @Match('password', { message: 'Passwords do not match' })
    confirmPassword!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: 'John Doe', description: 'The name of the user'})
    name!: string;


}

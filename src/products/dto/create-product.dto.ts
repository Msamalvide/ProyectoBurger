import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsString, IsUrl, Min } from "class-validator";


export class CreateProductDto {
    @IsString()
    @ApiProperty({
        description:'Name of Product',
        example:'Royal',
    })
    name!: string;

    @ApiProperty({
        description: 'Ingredients of product',
        example: ['Lechuga', 'tomate', 'cebolla caramelizada'],
    })
    @IsArray()
    @IsString({ each: true })
    ingredients!: string[];

    @IsUrl()
    @ApiProperty({
        description: 'URL of the product image',
    })
    imgUrl?:string;

    @IsNumber()
    @Min(0)
    @ApiProperty({
        description: 'Price of the product for simple size',
        example: 14500,
    })
    simplePrice!: number;

    @IsNumber()
    @Min(0)
    @ApiProperty({
        description: 'Price of the product for double size',
        example: 18500,
    })
    doublePrice!: number;

}

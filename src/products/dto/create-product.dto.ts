import { IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'products name' })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'sku' })
  readonly sku: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'category' })
  readonly id_category: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'country' })
  readonly id_country: number;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ description: 'international shipping' })
  readonly international_shipping: boolean;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'description language' })
  readonly id_language_description_product: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'description' })
  readonly description_product: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'currency' })
  readonly id_curency: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'price' })
  readonly price: number;
}

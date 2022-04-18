import { IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateProductDto {
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
}

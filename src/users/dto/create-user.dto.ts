import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'the email of user' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty({ description: 'the password of the user' })
  password: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'the first name of the user' })
  readonly first_name: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'the last name of the user' })
  readonly last_name: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'the country of the user' })
  readonly user_country: number;
}

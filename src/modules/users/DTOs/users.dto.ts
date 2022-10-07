import {
  IsString,
  IsNumber,
  IsEmail,
  IsNotEmpty,
  IsPositive,
  IsInt,
  IsObject,
} from 'class-validator';

import { PartialType, OmitType, ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class createLoginDto {
  email: string;
  password: string;
}

export class UserDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @IsInt()
  id: number;

  // @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  // @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'Here you have to send email,password and role' })
  @IsNotEmpty()
  @IsObject()
  login: object;
}

export class CreateLoginDto extends PartialType(createLoginDto) {}
export class CreateUserDto extends OmitType(UserDto, ['id']) {}
export class UpdateUserDto extends PartialType(
  OmitType(UserDto, ['id', 'login']),
) {}

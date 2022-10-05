import {
  IsString,
  IsNumber,
  IsEmail,
  IsNotEmpty,
  IsPositive,
  IsInt,
  IsObject,
} from 'class-validator';

import { PartialType, OmitType } from '@nestjs/mapped-types';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UserDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsObject()
  login: LoginDto;
}

export class CreateUserDto extends OmitType(UserDto, ['id']) {}
export class UpdateUserDto extends PartialType(
  OmitType(UserDto, ['id', 'login']),
) {}

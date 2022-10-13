import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

import { PartialType, ApiProperty } from '@nestjs/swagger';
import { Role } from '../entities/user.entity';

export class UserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'user.email should not be empty' })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'user.password should not be empty' })
  @IsString({ message: 'user.password should be a string' })
  password: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'user.role should not be empty' })
  @IsString({ message: 'user.role should be a string' })
  role: Role;
}

export class updateUser extends PartialType(UserDto) {}

// export class CreateLoginDto extends PartialType(createLoginDto) {}
// export class CreateUserDto extends OmitType(UserDto, ['id']) {}
// export class UpdateUserDto extends PartialType(
//   OmitType(UserDto, ['id', 'login']),
// ) {}

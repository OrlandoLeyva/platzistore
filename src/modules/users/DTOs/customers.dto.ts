import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEmpty,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CustomerDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'customer name is missing' })
  @IsString({ message: 'customer name should be a string' })
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'customer lastName is missing' })
  @IsString({ message: 'customer lastName is missing' })
  readonly lastName: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'customer phone should be a string' })
  readonly phone: string;

  @IsEmpty()
  userId: number;
}

export class UpdateCustomerDto extends PartialType(CustomerDto) {}

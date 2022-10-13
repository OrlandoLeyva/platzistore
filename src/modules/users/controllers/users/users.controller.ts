import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import { UsersService } from 'src/modules/users/services/users/users.service';
import { responses } from 'src/utils/response.handler';
import { CustomerDto } from '../../DTOs/customers.dto';
import { UserDto } from '../../DTOs/users.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/register')
  async create(
    @Body('customer') customer: CustomerDto,
    @Body('user') user: UserDto,
  ) {
    try {
      const newUser = await this.usersService.create(customer, user);
      return responses.success(201, 'Created', newUser);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async getAll() {
    try {
      const users = await this.usersService.findAll();
      return responses.success(200, 'OK', users);
    } catch (error) {
      throw error;
    }
  }

  // @Get('/:id')
  // get(@Param('id', ParseIntPipe) userId: number) {
  //   try {
  //     const user = this.usersService.findOne(userId);
  //     return responses.success(200, 'OK', user);
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // @Get('/:id/orders')
  // geOrders(@Param('id', ParseIntPipe) userId) {
  //   try {
  //     const orders = this.usersService.getUserOrders(userId);
  //     return responses.success(200, 'OK', orders);
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // @Patch('/:id')
  // update(
  //   @Param('id', ParseIntPipe) userId: number,
  //   @Body() changes: UpdateUserDto,
  // ) {
  //   try {
  //     const updatedUser = this.usersService.update(userId, changes);
  //     return responses.success(200, 'Created', updatedUser);
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // @Delete('/:id')
  // remove(@Param('id', ParseIntPipe) userId: number) {
  //   try {
  //     this.usersService.remove(userId);
  //     return responses.success(200, 'OK', null);
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import {
  CreateUserDto,
  LoginDto,
  UpdateUserDto,
} from 'src/modules/users/DTOs/users.dto';
import { UsersService } from 'src/modules/users/services/users/users.service';
import { responses } from 'src/utils/response.handler';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() payload: CreateUserDto, @Body('login') login: LoginDto) {
    try {
      const newUser = this.usersService.create(payload);
      return responses.success(201, 'Created', newUser);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  getAll() {
    try {
      const users = this.usersService.findAll();
      return responses.success(200, 'OK', users);
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  get(@Param('id', ParseIntPipe) userId: number) {
    try {
      const user = this.usersService.findOne(userId);
      return responses.success(200, 'OK', user);
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id/orders')
  geOrders(@Param('id', ParseIntPipe) userId) {
    try {
      // const orders = this.usersService.getUserOrders(userId);
      // return responses.success(200, 'OK', orders);
    } catch (error) {
      throw error;
    }
  }

  @Patch('/:id')
  update(
    @Param('id', ParseIntPipe) userId: number,
    @Body() changes: UpdateUserDto,
  ) {
    try {
      const updatedUser = this.usersService.update(userId, changes);
      return responses.success(200, 'Created', updatedUser);
    } catch (error) {
      throw error;
    }
  }

  @Delete('/:id')
  remove(@Param('id', ParseIntPipe) userId: number) {
    try {
      this.usersService.remove(userId);
      return responses.success(200, 'OK', null);
    } catch (error) {
      throw error;
    }
  }
}

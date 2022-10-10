import {
  HttpException,
  HttpStatus,
  Injectable,
  Inject,
  forwardRef,
} from '@nestjs/common';

import { ConfigType } from '@nestjs/config';

import {
  CreateUserDto,
  UpdateUserDto,
  UserDto,
} from 'src/modules/users/DTOs/users.dto';

import { responses } from 'src/utils/response.handler';
import { Order } from '../../entities/order.entity';
import { OrdersService } from '../orders/orders.service';
import env from 'src/config';
import { Client } from 'pg';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => OrdersService))
    private ordersService: OrdersService,
    @Inject(env.KEY)
    private configService: ConfigType<typeof env>,
    @Inject('DB') private db: Client,
  ) {}

  private users: UserDto[] = [
    {
      id: Math.floor(Math.random() * (1000 - 1) + 1),
      name: 'orlando',
      lastName: 'leyva',
      login: {
        email: 'orlando@mail.com',
        password: 'orlando123',
      },
    },
    {
      id: 1,
      name: 'jorge',
      lastName: 'almada',
      login: {
        email: 'jorge@mail.com',
        password: 'jorge123',
      },
    },
  ];

  create(payload: CreateUserDto) {
    const user: UserDto = {
      id: Math.floor(Math.random() * (1000 - 1) + 1),
      ...payload,
    };
    this.users.push(user);
    return user;
  }

  async findAll(): Promise<UserDto[]> {
    try {
      //you can type using <>.

      const usersDB = await this.db.query('select * from users');
      console.log(usersDB.rows);

      const users = this.users;
      return users;
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number): UserDto {
    try {
      const user = this.users.find((product) => product.id === id);
      if (!user)
        throw new HttpException(
          responses.error(404, 'User Not Found'),
          HttpStatus.NOT_FOUND,
        );
      return user;
    } catch (error) {
      throw error;
    }
  }

  update(id: number, changes: UpdateUserDto): UserDto {
    try {
      const userIndex = this.users.findIndex((product) => product.id === id);
      if (userIndex === -1)
        throw new HttpException(
          responses.error(404, 'User Not Found'),
          HttpStatus.NOT_FOUND,
        );
      this.users[userIndex] = {
        ...this.users[userIndex],
        ...changes,
      };
      return this.users[userIndex];
    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    try {
      const userIndex = this.users.findIndex((product) => product.id === id);
      if (userIndex === -1)
        throw new HttpException(
          responses.error(404, 'User Not Found'),
          HttpStatus.NOT_FOUND,
        );
      this.users.splice(userIndex, 1);
    } catch (error) {
      throw error;
    }
  }

  getUserOrders(id: number): Order[] {
    try {
      this.findOne(id);
      const orders = this.ordersService.findByUser(id);
      return orders;
    } catch (error) {
      throw error;
    }
  }
}

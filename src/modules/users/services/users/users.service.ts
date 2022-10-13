import {
  HttpException,
  HttpStatus,
  Injectable,
  Inject,
  forwardRef,
} from '@nestjs/common';

import { ConfigType } from '@nestjs/config';
import { responses } from 'src/utils/response.handler';
import { Order } from '../../entities/order.entity';
import { OrdersService } from '../orders/orders.service';
import env from 'src/config';
import { Client } from 'pg';
import { CustomerDto } from '../../DTOs/customers.dto';
import { UserDto } from '../../DTOs/users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { Customer } from '../../entities/customer.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => OrdersService))
    private ordersService: OrdersService,
    @Inject(env.KEY)
    private configService: ConfigType<typeof env>,
    @Inject('DB') private db: Client,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  async create(customer: CustomerDto, user: UserDto) {
    try {
      const newUser = await this.userRepo.save(user);
      const newCustomer = this.customerRepo.create(customer);
      newCustomer.user = newUser;
      await this.customerRepo.save(newCustomer);
      return newCustomer;
    } catch (error) {
      if (error.code === '23505')
        throw new HttpException(
          'Email already registered',
          HttpStatus.BAD_REQUEST,
        );
      throw error;
    }
  }

  async findAll() {
    try {
      return this.userRepo.find({ relations: ['customer'] });
    } catch (error) {
      throw error;
    }
  }

  // findOne(id: number): UserDto {
  //   try {
  //     const user = this.users.find((product) => product.id === id);
  //     if (!user)
  //       throw new HttpException(
  //         responses.error(404, 'User Not Found'),
  //         HttpStatus.NOT_FOUND,
  //       );
  //     return user;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // update(id: number, changes: UpdateUserDto): UserDto {
  //   try {
  //     const userIndex = this.users.findIndex((product) => product.id === id);
  //     if (userIndex === -1)
  //       throw new HttpException(
  //         responses.error(404, 'User Not Found'),
  //         HttpStatus.NOT_FOUND,
  //       );
  //     this.users[userIndex] = {
  //       ...this.users[userIndex],
  //       ...changes,
  //     };
  //     return this.users[userIndex];
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // remove(id: number) {
  //   try {
  //     const userIndex = this.users.findIndex((product) => product.id === id);
  //     if (userIndex === -1)
  //       throw new HttpException(
  //         responses.error(404, 'User Not Found'),
  //         HttpStatus.NOT_FOUND,
  //       );
  //     this.users.splice(userIndex, 1);
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // getUserOrders(id: number): Order[] {
  //   try {
  //     this.findOne(id);
  //     const orders = this.ordersService.findByUser(id);
  //     return orders;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}

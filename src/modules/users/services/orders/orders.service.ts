import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ProductsService } from 'src/modules/products/services/products/products.service';
import { CreateOrderDto } from '../../DTOs/orders.dto';

import { Order } from '../../entities/order.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class OrdersService {
  // constructor(private usersService: UsersService) {}
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private productsService: ProductsService,
  ) {}

  private orders: Order[] = [];

  create(order: CreateOrderDto): Order {
    const { productsId, userId } = order;
    const user = this.usersService.findOne(userId);
    const products = this.productsService.filterById(productsId);
    delete user.login;
    const newOrder: Order = {
      id: Math.floor(Math.random() * (1000 - 1) + 1),
      customer: user,
      products,
      date: new Date(),
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  findByUser(id: number) {
    try {
      const orders = this.orders.filter((order) => order.customer.id === id);
      return orders;
    } catch (error) {
      throw error;
    }
  }
}

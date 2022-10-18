import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/modules/products/entities/product.entity';
import { ProductsService } from 'src/modules/products/services/products/products.service';
import { responses } from 'src/utils/response.handler';
import { Repository } from 'typeorm';
import { OrderDto } from '../../DTOs/orders.dto';
import { Customer } from '../../entities/customer.entity';

import { Order } from '../../entities/order.entity';
import { OrdersProductsService } from '../orders-products/orders-products.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class OrdersService {
  // constructor(private usersService: UsersService) {}
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private productsService: ProductsService,
    private orderProductService: OrdersProductsService,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  private orders: Order[] = [];

  async create(order: OrderDto) {
    try {
      const customer = await this.customerRepo.findOneBy({
        id: order.customerId,
      });
      if (!customer)
        throw new HttpException(
          responses.error(404, `customer ${order.customerId} not found`),
          HttpStatus.NOT_FOUND,
        );

      for (const item of order.products) {
        const product = await this.productRepo.findOneBy({
          id: item.productId,
        });
        if (!product)
          throw new HttpException(
            responses.error(404, `product ${item.productId} not found`),
            HttpStatus.NOT_FOUND,
          );
      }

      const newOrder = new Order();
      newOrder.customer = customer;

      await this.orderRepo.save(newOrder);
      await this.orderProductService.create(newOrder, order.products);
      return newOrder;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: number) {
    try {
      const order = await this.orderRepo.findOne({
        where: { id },
        relations: ['purchases', 'purchases.product'],
      });
      if (!order)
        throw new HttpException(
          responses.error(404, `order ${id} not found`),
          HttpStatus.NOT_FOUND,
        );
      return order;
    } catch (error) {
      throw error;
    }
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

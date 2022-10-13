import { Body, Controller, Post } from '@nestjs/common';
import { responses } from 'src/utils/response.handler';
import { CreateOrderDto } from '../../DTOs/orders.dto';
import { OrdersService } from '../../services/orders/orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  // @Post()
  // create(@Body() order: CreateOrderDto) {
  //   try {
  //     const newOrder = this.ordersService.create(order);
  //     return responses.success(201, 'Created', newOrder);
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}

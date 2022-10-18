import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import { schemasValidator } from 'src/common/validator';
import { PurchasesSchema } from 'src/schemas/purchase.schema';
import { responses } from 'src/utils/response.handler';
import { OrderDto } from '../../DTOs/orders.dto';
import { OrdersService } from '../../services/orders/orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  async create(@Body() order: OrderDto) {
    try {
      schemasValidator(PurchasesSchema, order.products);
      const newOrder = await this.ordersService.create(order);
      return responses.success(201, 'Created', newOrder);
    } catch (error) {
      throw error;
    }
  }

  @Get('/:orderId')
  async getOne(@Param('orderId', ParseIntPipe) orderId: number) {
    try {
      const order = this.ordersService.findById(orderId);
      return order;
    } catch (error) {
      throw error;
    }
  }
}

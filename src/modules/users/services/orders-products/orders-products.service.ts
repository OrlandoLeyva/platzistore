import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from 'src/interfaces/purchase.interface';
import { Product } from 'src/modules/products/entities/product.entity';
import { Repository } from 'typeorm';
import { OrderProduct } from '../../entities/order-product.entity';
import { Order } from '../../entities/order.entity';

@Injectable()
export class OrdersProductsService {
  constructor(
    @InjectRepository(OrderProduct)
    private orderProductRepo: Repository<OrderProduct>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async create(order: Order, purchases: Purchase[]) {
    for (const purchase of purchases) {
      const newOrderProduct = new OrderProduct();
      newOrderProduct.order = order;
      newOrderProduct.product = await this.productRepo.findOneBy({
        id: purchase.productId,
      });
      newOrderProduct.quantity = purchase.quantity;
      await this.orderProductRepo.save(newOrderProduct);
    }
  }
}

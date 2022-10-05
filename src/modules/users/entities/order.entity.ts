import { Product } from 'src/modules/products/entities/product.entity';
import { Customer } from './customer.entity';

export class Order {
  id: number;
  customer: Customer;
  products: Product[];
  data: Date;
}

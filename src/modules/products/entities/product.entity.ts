import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Brand } from './brand.entity';
import { Category } from './category.entity';

//TODO: add the brand

//This will define the structure we use to create a new product in the database.
@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'int', nullable: false })
  price: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  image: string;

  @Column({ type: 'int', nullable: false })
  stock: number;

  // @Column({ type: 'varchar', unique: false, nullable: true })
  // owner: 'string';

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  //In the second argument we are indicating in which attribute is the relationship.
  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable()
  categories: Category[];
}

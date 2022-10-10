import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

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
}

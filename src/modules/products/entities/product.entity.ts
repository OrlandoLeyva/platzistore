//TODO: add the brand

//This will define the structure we use to create a new product in the database.
export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
}

// enum Roles {
//   admin = 'admin',
//   seller = 'seller',
//   customer = 'customer',
// }

type Role = 'admin' | 'seller' | 'customer';

export class User {
  id: number;
  email: string;
  password: string;
  role: Role;
}

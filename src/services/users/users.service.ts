import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  UpdateUserDto,
  UserDto,
} from 'src/schemas/users.schema';
import { responses } from 'src/utils/response.handler';

@Injectable()
export class UsersService {
  private users: UserDto[] = [
    {
      id: Math.floor(Math.random() * (1000 - 1) + 1),
      name: 'orlando',
      lastName: 'leyva',
      login: {
        email: 'orlando@mail.com',
        password: 'orlando123',
      },
    },
    {
      id: Math.floor(Math.random() * (1000 - 1) + 1),
      name: 'jorge',
      lastName: 'almada',
      login: {
        email: 'jorge@mail.com',
        password: 'jorge123',
      },
    },
  ];

  create(payload: CreateUserDto) {
    const user: UserDto = {
      id: Math.floor(Math.random() * (1000 - 1) + 1),
      ...payload,
    };
    this.users.push(user);
    return user;
  }

  findAll(): UserDto[] {
    try {
      const users = this.users;
      return users;
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number): UserDto {
    try {
      const user = this.users.find((product) => product.id === id);
      if (!user)
        throw new HttpException(
          responses.error(404, 'User Not Found'),
          HttpStatus.NOT_FOUND,
        );
      return user;
    } catch (error) {
      throw error;
    }
  }

  update(id: number, changes: UpdateUserDto): UserDto {
    try {
      const userIndex = this.users.findIndex((product) => product.id === id);
      if (userIndex === -1)
        throw new HttpException(
          responses.error(404, 'User Not Found'),
          HttpStatus.NOT_FOUND,
        );
      this.users[userIndex] = {
        ...this.users[userIndex],
        ...changes,
      };
      return this.users[userIndex];
    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    try {
      const userIndex = this.users.findIndex((product) => product.id === id);
      if (userIndex === -1)
        throw new HttpException(
          responses.error(404, 'User Not Found'),
          HttpStatus.NOT_FOUND,
        );
      this.users.splice(userIndex, 1);
    } catch (error) {
      throw error;
    }
  }
}

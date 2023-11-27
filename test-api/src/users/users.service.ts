import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
        id: 1,
        name: 'Jack',
        prop: "one",
    },
    {
        id: 2,
        name: 'John',
        prop: "two",
    },
    {
        id: 3,
        name: 'Jill',
        prop: "three",
    },
  ];
  create(createUserDto: CreateUserDto) {
    const newUser = {
      ...createUserDto,
      id: Date.now(),
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll(prop? : string) {
    if (prop) {
      return this.users.filter(user => user.prop === prop);
    }
    return this.users;
  }

  findOne(id: number) {
    if(!id) {
      throw new Error('user not found');
    }
    return this.users.find(user => user.id === id);
  }

  findByName(name: string) {
    if(!name) {
      throw new Error('user not found');
    }
    return this.users.find(user => user.name === name);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
          return { ...user, ...updateUserDto };
      }
      return user;
    });
    return this.findOne(id);
  }

  remove(id: number) {
    const toBeDeleted = this.findOne(id);
    this.users = this.users.filter(user => user.id !== id);
    return toBeDeleted;
  }
}

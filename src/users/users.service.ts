import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      userId: 1,
      username: 'John Doe',
      role: 'Admin',
      email: 'j1@j.com',
    },
    {
      userId: 2,
      username: 'Jane Doe',
      role: 'Intern',
      email: 'j2@j.com',
    },
    {
      userId: 3,
      username: 'Adam Kane',
      role: 'Engineer',
      email: 'j3@j.com',
    },
    {
      userId: 4,
      username: 'Manny  Doe',
      role: 'Intern',
      email: 'j4@j.com',
    },
  ];

  findAll(role?: 'Intern' | 'Engineer' | 'Admin') {
    if (role) {
        const rolesArray = this.users.filter((user) => user.role === role);
        if(rolesArray.length === 0){
            throw new NotFoundException(`User role not found`);
        }
        return rolesArray;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.userId === id);
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort(
      (a, b) => b.userId - a.userId,
    );
    const highestId = usersByHighestId[0].userId;
    const newUser = {
      userId: highestId + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.userId === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });
    return this.findOne(id);
  }

  deleteUser(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.userId !== id);
    return removedUser;
  }
}

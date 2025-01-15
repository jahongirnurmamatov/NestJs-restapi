import { Injectable } from '@nestjs/common';
import e from 'express';

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
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.userId === id);
    return user;
  }

  create(user: {
    username: string;
    email: string;
    role: 'Intern' | 'Engineer' | 'Admin';
  }) {
    const usersByHighestId = [...this.users].sort(
      (a, b) => b.userId - a.userId,
    );
    const highestId = usersByHighestId[0].userId;
    const newUser = {
      userId: highestId + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(
    id: string,
    updatedUser: {
      username?: string;
      email?: string;
      role?: 'Intern' | 'Engineer' | 'Admin';
    },
  ) {
    this.users = this.users.map((user) => {
      if (user.userId === parseInt(id)) {
        return { ...user, ...updatedUser };
      }
      return user;
    });
    return this.findOne(parseInt(id));
  }

  deleteUser(id: string) {
    const removedUser = this.findOne(parseInt(id));
    this.users = this.users.filter((user) => user.userId !== parseInt(id));
    return removedUser;
  }
}

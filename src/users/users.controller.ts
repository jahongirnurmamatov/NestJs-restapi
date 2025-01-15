import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get() //Get /users?role=admin
  findAll(@Query('role') role?: 'Intern' | 'Engineer' | 'Admin') {
    return this.usersService.findAll(role);
  }

  @Get('interns') //Get /users/interns
  findAllInterns() {
    return [];
  }

  @Get(':id') //Get /users/:id
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post() //Post /users
  create(
    @Body()
    user: {
      username: string;
      email: string;
      role: 'Intern' | 'Engineer' | 'Admin';
    },
  ) {
    return this.usersService.create(user);
  }

  @Patch(':id') //Patch /users/:id
  update(
    @Param('id') id: string,
    @Body()
    userUpdate: {
      username?: string;
      email?: string;
      role?: 'Intern' | 'Engineer' | 'Admin';
    },
  ) {
    return this.usersService.update(id, userUpdate);
  }

  @Delete(':id') //Delete /users/:id
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}

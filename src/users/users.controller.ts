import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ValidationPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post() //Post /users
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id') //Patch /users/:id
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id') //Delete /users/:id
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query('prop') prop: string) {
    return this.usersService.findAll(prop);
  }

  @Get(':id')
  findOne(@Param('id' , ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Get(':name')
  findByName(@Param('name') name: string) {
    return this.usersService.findByName(name);
  }

  @Patch(':id')
  update(@Param('id' , ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id' , ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}

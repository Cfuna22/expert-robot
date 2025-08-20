import {
  Controller,
  Post,
  Param,
  Get,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: { email: string; password: string }) {
    const { email, password } = createUserDto;

    return await this.userService.create(email, password);
  }

  @Get('id')
  async findAll(@Param('id') id: string) {
    return await this.userService.findById(Number(id));
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string) {
    return await this.userService.findByEmail(email);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: { email?: string; password?: string },
  ) {
    return await this.userService.update(Number(id), updateDto);
  }

  @Delete('id')
  async delete(@Param('id') id: string) {
    return await this.userService.delete(+id);
  }
}

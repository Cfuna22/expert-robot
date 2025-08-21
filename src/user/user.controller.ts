import {
  Controller,
  Post,
  Param,
  Get,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { error } from 'console';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: { email: string; password: string }) {
    const { email, password } = createUserDto;

    return await this.userService.create(email, password);
  }

  @Get(':id')
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

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    const UserId = parseInt(id, 10);

    try {
      await this.userService.delete(UserId);
    } catch (error) {
      if (error.message.includes('not found')) {
        throw new NotFoundException(`User with id ${UserId} not found`);
      }
      throw error;
    }
  }
}

import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ClientService } from './client.service';
// import { error } from 'console';

@Controller('client')
export class ClientController {
  constructor(private readonly clientServe: ClientService) {}

  @Post()
  async create(@Body() createDto: { email: string; password: string }) {
    const { email, password } = createDto;

    return await this.clientServe.create(email, password);
  }

  @Get()
  getAllUsers() {
    return this.clientServe;
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.clientServe.getUserById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDto: { email?: string; password: string },
  ) {
    return await this.clientServe.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number) {
    try {
      return await this.clientServe.delete(id);
    } catch (error) {
      if (error.onmessage.includes('not found')) {
        throw new NotFoundException(`User id: ${id} not  found`);
      }
      throw error;
    }
  }
}

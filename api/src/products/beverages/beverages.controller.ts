import { Controller, Get, Param, Post, Delete, Put } from '@nestjs/common';
import { BeveragesService } from './beverages.service';

@Controller('products/beverages')
export class BeveragesController {
  constructor(private beveragesService: BeveragesService) {}

  @Post()
  create() {

  }

  @Get()
  findAll() {

  }

  @Get(':beverageId')
  async findOne(@Param('beverageId') beverageId: number): Promise<string> {
    await this.beveragesService.get(beverageId);
    return 'hello';
  }

  @Put(':id')
  update(@Param('id') id: string): string {
    return 'hello';
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return 'hello';
  }
}

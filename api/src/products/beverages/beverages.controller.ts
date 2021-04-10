import { Controller, Get, Param, Post, Delete, Put } from '@nestjs/common';
import { BeveragesService } from './beverages.service';
import { Beverage } from './domain/models';

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
  async findOne(@Param('beverageId') beverageId: number): Promise<Beverage> {
    const beverage: Beverage = await this.beveragesService.get(beverageId);
    return beverage;
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

import { Controller, Get, Param, Post, Delete, Put } from '@nestjs/common';

@Controller('products/beverages')
export class BeveragesController {
  @Post()
  create() {

  }

  @Get()
  findAll() {

  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
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

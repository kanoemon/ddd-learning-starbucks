import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BeveragesController } from './beverages.controller';
import { BeveragesEntity } from './beverages.entity';
import { BeveragesService } from './beverages.service';

@Module({
  imports: [TypeOrmModule.forFeature([BeveragesEntity])],
  controllers: [BeveragesController],
  providers: [BeveragesService],
})
export class BeveragesModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BeveragesController } from './beverages.controller';
import { BeveragesEntity } from './beverages.entity';
import { BeveragesRepository } from './beverages.repository';
import { BeveragesService } from './beverages.service';

@Module({
  imports: [TypeOrmModule.forFeature([BeveragesEntity])],
  controllers: [BeveragesController],
  providers: [
    BeveragesService,
    BeveragesRepository
  ],
})
export class BeveragesModule {}

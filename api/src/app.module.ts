import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {BeveragesController} from './controllers';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    BeveragesController
  ],
  providers: [AppService],
})
export class AppModule {}

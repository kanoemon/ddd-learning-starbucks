import { Test, TestingModule } from '@nestjs/testing';
import { BeveragesController } from './beverages.controller';
import { BeveragesRepository } from './beverages.repository';
import { BeveragesService } from './beverages.service';

describe('AppController', () => {
  let controller: BeveragesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BeveragesController],
      providers: [BeveragesService, BeveragesRepository],
    }).compile();

    controller = app.get<BeveragesController>(BeveragesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      expect(await controller.findOne(1)).toBe('hello');
    });
  });
});

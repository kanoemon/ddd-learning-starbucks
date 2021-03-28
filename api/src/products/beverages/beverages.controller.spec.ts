import { Test, TestingModule } from '@nestjs/testing';
import { BeveragesController } from './beverages.controller';
import { BeveragesService } from './beverages.service';

describe('AppController', () => {
  let controller: BeveragesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BeveragesController],
      providers: [BeveragesService],
    }).compile();

    controller = app.get<BeveragesController>(BeveragesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(controller.findOne(1)).toBe('hello');
    });
  });
});

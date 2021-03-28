import { Injectable } from '@nestjs/common';
import { BeverageId } from './domain/models';

@Injectable()
export class BeveragesService {
  constructor() {}

  get(aBeverageId: number) {
    const beverageId: BeverageId = new BeverageId(aBeverageId);
  }
}

import { Injectable } from '@nestjs/common';
import { BeverageId } from './domain/models';

@Injectable()
export class BeveragesService {
  get(aBeverageId: number) {
    const beverageId: BeverageId = new BeverageId(aBeverageId);
  }
}

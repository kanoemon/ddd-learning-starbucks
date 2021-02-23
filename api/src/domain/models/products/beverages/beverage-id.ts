export class BeverageId {
  constructor(readonly id: number) {}

  equals(aBeverageId: BeverageId): boolean {
    return aBeverageId.id === this.id;
  }
}

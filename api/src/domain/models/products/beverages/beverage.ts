export class Beverage {
  private _name: string;

  constructor(aName: string) {
    this.setName(aName);
  }

  private setName(aName: string): void {
    this._name = aName;
  }

  get name(): string {
    return this._name;
  }
}

import { BaseModel } from '../base-model';

export class LocationJSON extends BaseModel {
  manufacturingObjects: ManufacturingObject[];
  isStartLocation: boolean;

  constructor(name: string, description: string, manufacturingObjects: ManufacturingObject[],
              isStartLocation: boolean) {
    super(name, description);
    this.manufacturingObjects = manufacturingObjects;
    this.isStartLocation = isStartLocation;
  }
}

export class ManufacturingObject {
  name: string;
  buildCosts: BuildCost[];

  constructor(name: string, buildCosts: BuildCost[]) {
    this.name = name;
    this.buildCosts = buildCosts;
  }
}

export class BuildCost {
  name: string;
  amount: number;
  type: string;
  or: number;

  constructor(name: string, amount: number, type: string, or: number = undefined) {
    this.name = name;
    this.amount = amount;
    this.type = type;
    this.or = or;
  }
}

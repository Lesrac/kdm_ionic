import { BaseModel } from './base_model';

/**
 * Created by Daniel on 23.04.2017.
 */
export class Principle extends BaseModel {
  type: PrincipleType;

  constructor(name: string, description: string, type: PrincipleType) {
    super(name, description);
    this.type = type;
  }
}

export class PrincipleType {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

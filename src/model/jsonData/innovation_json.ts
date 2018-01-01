import { BaseModel } from '../base_model';

export class InnovationJSON extends BaseModel {

  consequence: string;
  tags: string[];
  isBase: boolean;

  constructor(name: string, description: string, consequence: string, tags: string[], isBase: boolean) {
    super(name, description);
    this.consequence = consequence;
    this.tags = tags;
    this.isBase = isBase;
  }
}

import { BaseModel } from '../base_model';

export class StorageJSON extends BaseModel {

  amount: number;
  tags: string[];

  constructor(name: string, description: string, amount: number, tags: string[]) {
    super(name, description);
    this.amount = amount;
    this.tags = tags;
  }
}

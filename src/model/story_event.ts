/**
 * Created by Daniel on 05.02.2017.
 */
import { BaseModel } from './base_model';

export class StoryEvent extends BaseModel {
  id: number;

  constructor(name: string, description: string, id: number) {
    super(name, description);
    this.id = id;
  }
}

import { BaseModel } from './base_model';
/**
 * Created by Daniel on 19.02.2017.
 */
export class Innovation extends BaseModel {
  consequence: InnovationTag;
  tags: InnovationTag[];
  isBase: boolean;
}

export enum InnovationTag {
  STARTING_INNOVATION,
  ART,
  LANGUAGE_CONSEQUENCE,
  SCIENCE,
  PAINT_CONSEQUENCE,
  AMMONIA_CONSEQUENCE,
}

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
  EDUCATION,
  MUSIC,
  FAITH,
  HOME,
  SYMPOSIUM_CONSEQUENCE,
  INNER_LANTERN_CONSEQUENCE,
  HOVEL_CONSEQUENCE,
  DRUMS_CONSEQUENCE,
  PAINT_CONSEQUENCE,
  FORBIDDEN_DANCE_CONSEQUENCE,
  SONG_OF_THE_BRAVE_CONSEQUENCE,
  SHRINE_CONSEQUENCE,
  LANTERN_OVEN_CONSEQUENCE,
  AMMONIA_CONSEQUENCE,
}

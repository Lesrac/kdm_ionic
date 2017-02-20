/**
 * Created by Daniel on 19.02.2017.
 */
export class Innovation {
  name: string;
  description: string;
  consequence: InnovationTag;
  tags: InnovationTag[];
}

export enum InnovationTag {
  STARTING_INNOVATION,
  ART,
  LANGUAGE_CONSEQUENCE,
  SCIENCE,
  PAINT_CONSEQUENCE,
  AMMONIA_CONSEQUENCE
}

import { Storage } from './storage';

/**
 * Created by Daniel on 08.02.2017.
 */
export class Resource extends Storage {
  type: ResourceType;
  existingCards: number;
}

export enum ResourceType {
  Basic = 'BASIC',
  WhiteLion = 'WHITELION',
  Phoenix = 'PHOENIX',
  ScreamingAntelope = 'SCREAMINGANTELOPE',
  Strange = 'STRANGE',
}

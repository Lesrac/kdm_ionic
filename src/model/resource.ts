import { Storage, StorageTag } from './storage';

/**
 * Created by Daniel on 08.02.2017.
 */
export class Resource extends Storage {
  type: ResourceType;
  existingCards: number;

  constructor(name: string, description: string, amount: number, tags: StorageTag[], type: ResourceType, existingCards: number) {
    super(name, description, amount, tags);
    this.type = type;
    this.existingCards = existingCards;
  }
}

export enum ResourceType {
  BASIC = 'BASIC',
  WHITELION = 'WHITELION',
  PHOENIX = 'PHOENIX',
  SCREAMINGANTELOPE = 'SCREAMINGANTELOPE',
  STRANGE = 'STRANGE',
}

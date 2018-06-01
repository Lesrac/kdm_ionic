import { StorageJSON } from './storage-json';

export class ResourceJSON extends StorageJSON {

  type: string;
  existingCards: number;

  constructor(name: string, description: string, amount: number, tags: string[], type: string, existingCards: number) {
    super(name, description, amount, tags);
    this.type = type;
    this.existingCards = existingCards;
  }
}

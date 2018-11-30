import { StorageJSON } from './storage-json';
export class ResourceJSON extends StorageJSON {
    constructor(name, description, amount, tags, type, existingCards) {
        super(name, description, amount, tags);
        this.type = type;
        this.existingCards = existingCards;
    }
}
//# sourceMappingURL=resource-json.js.map
import { BaseModel } from '../base-model';
export class StorageJSON extends BaseModel {
    constructor(name, description, amount, tags) {
        super(name, description);
        this.amount = amount;
        this.tags = tags;
    }
}
//# sourceMappingURL=storage-json.js.map
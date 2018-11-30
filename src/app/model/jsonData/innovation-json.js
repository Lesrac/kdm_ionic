import { BaseModel } from '../base-model';
export class InnovationJSON extends BaseModel {
    constructor(name, description, consequence, tags, isBase) {
        super(name, description);
        this.consequence = consequence;
        this.tags = tags;
        this.isBase = isBase;
    }
}
//# sourceMappingURL=innovation-json.js.map
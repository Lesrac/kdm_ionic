import { BaseModel } from './base-model';
/**
 * Created by Daniel on 23.04.2017.
 */
export class Principle extends BaseModel {
    constructor(name, description, type) {
        super(name, description);
        this.type = type;
    }
}
export class PrincipleType {
    constructor(name) {
        this.name = name;
    }
}
//# sourceMappingURL=principle.js.map
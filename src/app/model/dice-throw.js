import { BaseModel } from './base-model';
export class DiceThrow extends BaseModel {
    constructor(name, description, minRoll, maxRoll) {
        super(name, description);
        this.minRoll = minRoll;
        this.maxRoll = maxRoll;
    }
}
//# sourceMappingURL=dice-throw.js.map
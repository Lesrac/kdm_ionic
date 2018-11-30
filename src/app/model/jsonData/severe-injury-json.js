import { DiceThrow } from '../dice-throw';
export class SevereInjuryJSON extends DiceThrow {
    constructor(name, description, minRoll, maxRoll, hitLocation) {
        super(name, description, minRoll, maxRoll);
        this.hitLocation = hitLocation;
    }
}
//# sourceMappingURL=severe-injury-json.js.map
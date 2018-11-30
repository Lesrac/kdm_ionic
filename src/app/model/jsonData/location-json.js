import { BaseModel } from '../base-model';
export class LocationJSON extends BaseModel {
    constructor(name, description, manufacturingObjects, isStartLocation) {
        super(name, description);
        this.manufacturingObjects = manufacturingObjects;
        this.isStartLocation = isStartLocation;
    }
}
export class ManufacturingObject {
    constructor(name, buildCosts) {
        this.name = name;
        this.buildCosts = buildCosts;
    }
}
export class BuildCost {
    constructor(name, amount, type, or = undefined) {
        this.name = name;
        this.amount = amount;
        this.type = type;
        this.or = or;
    }
}
//# sourceMappingURL=location-json.js.map
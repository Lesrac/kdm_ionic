import { BaseModel } from './base-model';
/**
 * Created by Daniel on 14.02.2017.
 */
export class Location extends BaseModel {
    constructor(name, description, manufacturingObjects, isStartLocation) {
        super(name, description);
        // Equipment --> Innovation/ResourceName/StorageTag & amount
        this.manufacturingObjects = new Map();
        this.manufacturingObjects = manufacturingObjects ? manufacturingObjects : new Map();
        this.isStartLocation = isStartLocation;
    }
}
//# sourceMappingURL=location.js.map
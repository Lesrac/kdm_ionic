import { Storage } from './storage';
/**
 * Created by Daniel on 08.02.2017.
 */
export class Resource extends Storage {
    constructor(name, description, amount, tags, type, existingCards) {
        super(name, description, amount, tags);
        this.type = type;
        this.existingCards = existingCards;
    }
}
export var ResourceType;
(function (ResourceType) {
    ResourceType["BASIC"] = "BASIC";
    ResourceType["WHITELION"] = "WHITELION";
    ResourceType["PHOENIX"] = "PHOENIX";
    ResourceType["SCREAMINGANTELOPE"] = "SCREAMINGANTELOPE";
    ResourceType["STRANGE"] = "STRANGE";
})(ResourceType || (ResourceType = {}));
//# sourceMappingURL=resource.js.map
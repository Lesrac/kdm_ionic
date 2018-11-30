import { BaseModel } from './base-model';
/**
 * Created by Daniel on 19.02.2017.
 */
export class Innovation extends BaseModel {
    constructor(name, description, consequence, tags, isBase) {
        super(name, description);
        this.consequence = consequence;
        this.tags = tags;
        this.isBase = isBase;
    }
}
export var InnovationTag;
(function (InnovationTag) {
    InnovationTag["ART"] = "ART";
    InnovationTag["EDUCATION"] = "EDUCATION";
    InnovationTag["FAITH"] = "FAITH";
    InnovationTag["HOME"] = "HOME";
    InnovationTag["MUSIC"] = "MUSIC";
    InnovationTag["OTHER"] = "OTHER";
    InnovationTag["SCIENCE"] = "SCIENCE";
    InnovationTag["STARTING_INNOVATION"] = "STARTING_INNOVATION";
    InnovationTag["AMMONIA_CONSEQUENCE"] = "AMMONIA_CONSEQUENCE";
    InnovationTag["DRUMS_CONSEQUENCE"] = "DRUMS_CONSEQUENCE";
    InnovationTag["FAMILY_CONSEQUENCE"] = "FAMILY_CONSEQUENCE";
    InnovationTag["FORBIDDEN_DANCE_CONSEQUENCE"] = "FORBIDDEN_DANCE_CONSEQUENCE";
    InnovationTag["HOVEL_CONSEQUENCE"] = "HOVEL_CONSEQUENCE";
    InnovationTag["INNER_LANTERN_CONSEQUENCE"] = "INNER_LANTERN_CONSEQUENCE";
    InnovationTag["LANGUAGE_CONSEQUENCE"] = "LANGUAGE_CONSEQUENCE";
    InnovationTag["LANTERN_OVEN_CONSEQUENCE"] = "LANTERN_OVEN_CONSEQUENCE";
    InnovationTag["SCULPURE_CONSEQUENCE"] = "SCULPURE_CONSEQUENCE";
    InnovationTag["SHRINE_CONSEQUENCE"] = "SHRINE_CONSEQUENCE";
    InnovationTag["STORYTELLING_CONSEQUENCE"] = "STORYTELLING_CONSEQUENCE";
    InnovationTag["SONG_OF_THE_BRAVE_CONSEQUENCE"] = "SONG_OF_THE_BRAVE_CONSEQUENCE";
    InnovationTag["SYMPOSIUM_CONSEQUENCE"] = "SYMPOSIUM_CONSEQUENCE";
    InnovationTag["PAINT_CONSEQUENCE"] = "PAINT_CONSEQUENCE";
    InnovationTag["PICTOGRAPH_CONSEQUENCE"] = "PICTOGRAPH_CONSEQUENCE";
})(InnovationTag || (InnovationTag = {}));
//# sourceMappingURL=innovation.js.map
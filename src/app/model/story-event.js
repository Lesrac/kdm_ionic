/**
 * Created by Daniel on 05.02.2017.
 */
import { BaseModel } from './base-model';
export class StoryEvent extends BaseModel {
    constructor(name, description, id) {
        super(name, description);
        this.id = id;
    }
}
//# sourceMappingURL=story-event.js.map
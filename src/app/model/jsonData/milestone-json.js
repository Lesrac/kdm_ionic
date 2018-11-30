import { LanternEventJSON } from './lantern-event-json';
export class MilestoneJSON extends LanternEventJSON {
    constructor(name, todo, storyEvents, id, tag, value, comparator, observerTarget, milestoneType) {
        super(name, todo, storyEvents);
        this.id = id;
        this.tag = tag;
        this.value = value;
        this.comparator = comparator;
        this.observerTarget = observerTarget;
        this.milestoneType = milestoneType;
    }
}
//# sourceMappingURL=milestone-json.js.map
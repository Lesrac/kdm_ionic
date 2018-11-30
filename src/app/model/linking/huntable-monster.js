import { Subject } from 'rxjs';
/**
 * Created by Daniel on 26.05.2017.
 */
export class HuntableMonster {
    constructor(settlement, monster) {
        this.isHuntableChanged = new Subject();
        this.defeatedLevelOneChanged = new Subject();
        this.defeatedLevelTwoChanged = new Subject();
        this.defeatedLevelThreeChanged = new Subject();
        this._isHuntable = false;
        this._defeatedLevelOne = false;
        this._defeatedLevelTwo = false;
        this._defeatedLevelThree = false;
        this.settlement = settlement;
        this.monster = monster;
    }
    get isHuntable() {
        return this._isHuntable;
    }
    set isHuntable(value) {
        this._isHuntable = value;
        this.isHuntableChanged.next(value);
    }
    get defeatedLevelOne() {
        return this._defeatedLevelOne;
    }
    set defeatedLevelOne(value) {
        this._defeatedLevelOne = value;
        this.defeatedLevelOneChanged.next(value);
    }
    get defeatedLevelTwo() {
        return this._defeatedLevelTwo;
    }
    set defeatedLevelTwo(value) {
        this._defeatedLevelTwo = value;
        this.defeatedLevelTwoChanged.next(value);
    }
    get defeatedLevelThree() {
        return this._defeatedLevelThree;
    }
    set defeatedLevelThree(value) {
        this._defeatedLevelThree = value;
        this.defeatedLevelThreeChanged.next(value);
    }
}
//# sourceMappingURL=huntable-monster.js.map
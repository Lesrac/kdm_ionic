/**
 * Created by Daniel on 18.10.2017.
 */
export class HuntableMonsterDB {
    constructor(settlementId, monsterId, isHuntable, defeatedLevelOne, defeatedLevelTwo, defeatedLevelThree) {
        this.isHuntable = false;
        this.defeatedLevelOne = false;
        this.defeatedLevelTwo = false;
        this.defeatedLevelThree = false;
        this.settlementId = settlementId;
        this.monsterId = monsterId;
        this.isHuntable = isHuntable;
        this.defeatedLevelOne = defeatedLevelOne;
        this.defeatedLevelTwo = defeatedLevelTwo;
        this.defeatedLevelThree = defeatedLevelThree;
    }
}
//# sourceMappingURL=huntable-monster-db.js.map
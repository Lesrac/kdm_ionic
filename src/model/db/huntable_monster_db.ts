/**
 * Created by Daniel on 18.10.2017.
 */
export class HuntableMonsterDB {
  settlementId: number;
  monsterId: number;
  isHuntable: boolean = false;
  defeatedLevelOne: boolean = false;
  defeatedLevelTwo: boolean = false;
  defeatedLevelThree: boolean = false;

  constructor(settlementId: number, monsterId: number, isHuntable: boolean, defeatedLevelOne: boolean,
              defeatedLevelTwo: boolean, defeatedLevelThree: boolean) {
    this.settlementId = settlementId;
    this.monsterId = monsterId;
    this.isHuntable = isHuntable;
    this.defeatedLevelOne = defeatedLevelOne;
    this.defeatedLevelTwo = defeatedLevelTwo;
    this.defeatedLevelThree = defeatedLevelThree;
  }
}

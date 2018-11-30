import { Monster } from '../monster';
import { Settlement } from '../settlement';
import { Subject } from 'rxjs';

/**
 * Created by Daniel on 26.05.2017.
 */
export class HuntableMonster {
  settlement: Settlement;
  monster: Monster;
  isHuntableChanged: Subject<boolean> = new Subject<boolean>();
  defeatedLevelOneChanged: Subject<boolean> = new Subject<boolean>();
  defeatedLevelTwoChanged: Subject<boolean> = new Subject<boolean>();
  defeatedLevelThreeChanged: Subject<boolean> = new Subject<boolean>();
  private _isHuntable: boolean = false;
  private _defeatedLevelOne: boolean = false;
  private _defeatedLevelTwo: boolean = false;
  private _defeatedLevelThree: boolean = false;

  constructor(settlement: Settlement, monster: Monster) {
    this.settlement = settlement;
    this.monster = monster;
  }

  get isHuntable(): boolean {
    return this._isHuntable;
  }

  set isHuntable(value: boolean) {
    this._isHuntable = value;
    this.isHuntableChanged.next(value);
  }

  get defeatedLevelOne(): boolean {
    return this._defeatedLevelOne;
  }

  set defeatedLevelOne(value: boolean) {
    this._defeatedLevelOne = value;
    this.defeatedLevelOneChanged.next(value);
  }

  get defeatedLevelTwo(): boolean {
    return this._defeatedLevelTwo;
  }

  set defeatedLevelTwo(value: boolean) {
    this._defeatedLevelTwo = value;
    this.defeatedLevelTwoChanged.next(value);
  }

  get defeatedLevelThree(): boolean {
    return this._defeatedLevelThree;
  }

  set defeatedLevelThree(value: boolean) {
    this._defeatedLevelThree = value;
    this.defeatedLevelThreeChanged.next(value);
  }
}

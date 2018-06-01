/**
 * Created by Daniel on 18.10.2017.
 */
export class HuntedMonsterDB {
  settlementId: number;
  // id
  monsterId: number;
  // resource_name, amount
  huntedResources: Array<[string, number]> = [];
  monsterLevel: number;

  constructor(settlementId: number, monsterId: number, monsterLevel: number, huntedResources: Array<[string, number]>) {
    this.settlementId = settlementId;
    this.monsterId = monsterId;
    this.monsterLevel = monsterLevel;
    this.huntedResources = huntedResources;
  }

}

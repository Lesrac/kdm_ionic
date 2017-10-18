/**
 * Created by Daniel on 18.10.2017.
 */
export class HuntedMonsterDB {
  settlement: number;
  // id, level
  monster: [number, number];
  // resource_name, amount
  huntedResources: Array<[string, number]> = [];

  constructor(settlementId: number, monster: [number, number], huntedResources: Array<[string, number]>) {
    this.settlement = settlementId;
    this.monster = monster;
    this.huntedResources = huntedResources;
  }

}

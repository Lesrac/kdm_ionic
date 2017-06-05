import { Monster } from '../monster';
import { Settlement } from '../settlement';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { Column, JoinColumn, ManyToOne } from 'typeorm';
/**
 * Created by Daniel on 26.05.2017.
 */
@Entity()
export class HuntableMonster {
  @ManyToOne(type => Settlement, settlement => settlement.huntableMonsters)
  settlement: Settlement;
  @ManyToOne(type => Monster)
  monster: Monster;
  @Column()
  isHuntable: boolean = false;
  @Column()
  defeatedLevelOne: boolean = false;
  @Column()
  defeatedLevelTwo: boolean = false;
  @Column()
  defeatedLevelThree: boolean = false;

  constructor(settlement: Settlement, monster: Monster) {
    this.settlement = settlement;
    this.monster = monster;
  }
}

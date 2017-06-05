import { Settlement } from '../settlement';
import { Timeline } from '../timeline';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { Column, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
/**
 * Created by Daniel on 21.03.2017.
 */
@Entity()
export class SettlementTimeline {
  @ManyToOne(type => Settlement, settlement => settlement.timeline)
  settlement: Settlement;
  @OneToOne(type => Timeline)
  @JoinColumn()
  timeline: Timeline;
  @Column()
  reached: boolean = false;

  constructor(settlement: Settlement, timeline: Timeline) {
    this.settlement = settlement;
    this.timeline = timeline;
  }
}

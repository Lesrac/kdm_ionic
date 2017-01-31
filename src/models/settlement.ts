import {Timeline} from "./timeline";
import {LanternEvent} from "./lantern_event";
import {Monster} from "./monster";
/**
 * Created by Daniel on 27.01.2017.
 */
export class Settlement{
  name: string;
  survivalLimit: number = 0;
  population: number = 0;
  deahtcount: number = 0;
  timeline: Timeline[] = [];
  milestones: LanternEvent[] = [];
  nemesisMonsters: Monster[] = [];
  quarries: Monster[] = [];
  defeatedMonsters: Monster[] = [];

  constructor(name: string){
    this.name = name;
  }
}

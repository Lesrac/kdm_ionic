import {Timeline} from "./timeline";
import {Monster} from "./monster";
import {Milestone} from "./milestone";
/**
 * Created by Daniel on 27.01.2017.
 */
export class Settlement {
  name: string;
  survivalLimit: number = 0;
  population: number = 0;
  deahtcount: number = 0;
  timeline: Timeline[] = [];
  milestones: Milestone[] = [];
  nemesisMonsters: Monster[] = [];
  quarries: Monster[] = [];
  defeatedMonsters: Monster[] = [];

  constructor(name: string) {
    this.name = name;
  }
}

/**
 * Created by Daniel on 27.01.2017.
 */
export class LanternEvent{
  name: string;
  tag: string;
  reached: boolean = false;
  isMilestone: boolean = false;

  constructor(name = ''){
    this.name = name;
  }
}

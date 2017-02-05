import {StoryEvent} from "./story_event";
/**
 * Created by Daniel on 27.01.2017.
 */
export class LanternEvent{
  name: string;
  tag: string;
  reached: boolean = false;
  isMilestone: boolean = false;
  todo: string;
  storyEvents: StoryEvent[] = [];

  constructor(name = ''){
    this.name = name;
  }
}

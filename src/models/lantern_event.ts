import {StoryEvent} from "./story_event";
/**
 * Created by Daniel on 27.01.2017.
 */
export class LanternEvent {
  name: string;
  reached: boolean = false;
  todo: string;
  storyEvents: StoryEvent[] = [];

  constructor(name = '') {
    this.name = name;
  }
}

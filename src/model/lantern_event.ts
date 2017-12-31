import { StoryEvent } from './story_event';

/**
 * Created by Daniel on 27.01.2017.
 */
export class LanternEvent {
  name: string;
  todo: string;
  storyEvents: StoryEvent[] = [];

  constructor(name = '', todo = '') {
    this.name = name;
    this.todo = todo;
  }
}

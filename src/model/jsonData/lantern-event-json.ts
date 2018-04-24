export class LanternEventJSON {
  name: string;
  todo: string;
  storyEvents: number[] = [];

  constructor(name: string, todo: string, storyEvents: number[]) {
    this.name = name;
    this.todo = todo;
    this.storyEvents = storyEvents;
  }
}

export class TimelineJSON {
  position: number;
  lanternEvent: string;

  constructor(position: number, lanternEvent: string) {
    this.position = position;
    this.lanternEvent = lanternEvent;
  }
}

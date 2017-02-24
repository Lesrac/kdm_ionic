/**
 * Created by Daniel on 24.02.2017.
 */
export class Survivor {
  static counter: number = 0;
  id: number;
  name: string;
  isAlive: boolean = true;

  constructor(name: string) {
    this.name = name;
    this.id = Survivor.counter++;
  }
}

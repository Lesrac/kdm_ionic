/**
 * Created by Daniel on 16.03.2017.
 */
export class BaseModel {
  name: string;
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}

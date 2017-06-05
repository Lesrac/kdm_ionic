import { Entity } from 'typeorm/decorator/entity/Entity';
import { Column, PrimaryColumn } from 'typeorm';
/**
 * Created by Daniel on 16.03.2017.
 */
@Entity()
export class BaseModel {
  @PrimaryColumn()
  name: string;
  @Column()
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}

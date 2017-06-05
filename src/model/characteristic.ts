import { Entity } from 'typeorm/decorator/entity/Entity';
import { PrimaryColumn } from 'typeorm';
/**
 * Created by Daniel on 12.03.2017.
 */
@Entity()
export class Characteristic {
  @PrimaryColumn()
  name: string;
}

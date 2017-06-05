import { Entity } from 'typeorm/decorator/entity/Entity';
import { PrimaryColumn } from 'typeorm';
/**
 * Created by Daniel on 05.06.2017.
 */
@Entity()
export class ResourceType {
  @PrimaryColumn()
  name: string;
}

import { Storage } from './storage';
import { Affinity } from './affinity';
import { Direction } from './direction';
import { Entity } from 'typeorm/decorator/entity/Entity';
/**
 * Created by Daniel on 20.02.2017.
 */
@Entity()
export class Equipment extends Storage {
  affinities: Map<Affinity, Direction[]>;
}

import { Storage } from './storage';
import { BaseModel } from './base_model';
/**
 * Created by Daniel on 14.02.2017.
 */
export class Location extends BaseModel {
  built: boolean;
  storages: Storage[] = [];
}

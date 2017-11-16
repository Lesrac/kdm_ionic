import { BaseModel } from './base_model';
import { Equipment } from './equipment';
import { StorageTag } from './storage';
import { Innovation } from './innovation';

/**
 * Created by Daniel on 14.02.2017.
 */
export class Location extends BaseModel {
  // Equipment --> Innovation/ResourceName/StorageTag & amount
  storageCreation: Map<Equipment, Map<Innovation | string | StorageTag, number>> = new Map<Equipment,
    Map<Innovation | string | StorageTag, number>>();
  isStartLocation: boolean;
}

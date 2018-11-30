import { BaseModel } from './base-model';
import { Equipment } from './equipment';
import { StorageTag } from './storage';
import { Innovation } from './innovation';

/**
 * Created by Daniel on 14.02.2017.
 */
export class Location extends BaseModel {
  // Equipment --> Innovation/ResourceName/StorageTag & amount
  manufacturingObjects: Map<Equipment, Map<Innovation | string | StorageTag, [number]>> = new Map<Equipment,
    Map<Innovation | string | StorageTag, [number]>>();
  isStartLocation: boolean;

  constructor(name: string, description: string,
              manufacturingObjects: Map<Equipment, Map<Innovation | string | StorageTag, [number]>>,
              isStartLocation: boolean) {
    super(name, description);
    this.manufacturingObjects = manufacturingObjects ? manufacturingObjects : new Map<Equipment,
      Map<Innovation | string | StorageTag, [number]>>();
    this.isStartLocation = isStartLocation;
  }
}

import { Storage } from './storage';
/**
 * Created by Daniel on 14.02.2017.
 */
export class Location {
  name: string;
  built: boolean;
  storages: Storage[] = [];
}

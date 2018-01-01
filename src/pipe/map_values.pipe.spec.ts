import { MapValuesPipe } from './map_values.pipe';
import { Affinity, Direction, Equipment } from '../model/equipment';
import { Innovation, InnovationTag } from '../model/innovation';
import { StorageTag } from '../model/storage';

describe('Pipe: mapValuesPipe', () => {
  let pipe: MapValuesPipe;
  let fullMap: Map<Equipment, Map<Innovation | string | StorageTag, [number]>>;
  let map1: Map<Innovation | string | StorageTag, [number]>;
  let map2: Map<Innovation | string | StorageTag, [number]>;
  let equipment1: Equipment;
  let equipment2: Equipment;

  beforeEach(() => {
    pipe = new MapValuesPipe();
    fullMap = new Map<Equipment, Map<Innovation | string | StorageTag, [number]>>();
    map1 = new Map<Innovation | string | StorageTag, [number]>();
    map2 = new Map<Innovation | string | StorageTag, [number]>();
    equipment1 = new Equipment('to do', 'nothing', 1, [StorageTag.ITEM], new Map<Affinity, Direction[]>());
    equipment2 = new Equipment('done', 'everything', 1, [StorageTag.ITEM], new Map<Affinity, Direction[]>());
  });

  it('Map with strings', () => {
    const ammunition: string = 'AMMUNITION';
    const arrow: string = 'ARROW';

    map1.set(ammunition, [2]);
    map1.set(arrow, [4]);

    map2.set(ammunition, [1]);

    fullMap.set(equipment1, map1);
    fullMap.set(equipment2, map2);

    const dummyObjects: { equipment: Equipment, costs: [{ amount: number, what: any }] }[] = pipe.transform(fullMap);
    expect(dummyObjects.length).toEqual(2);
    expect(dummyObjects[0].equipment).toBe(equipment1);
    expect(dummyObjects[0].costs.length).toEqual(2);
    expect(dummyObjects[0].costs[0].what).toEqual(<StorageTag>StorageTag[<string>ammunition]);
    expect(dummyObjects[0].costs[1].what).toEqual(<StorageTag>StorageTag[<string>arrow]);
    expect(dummyObjects[1].equipment).toBe(equipment2);
    expect(dummyObjects[1].costs.length).toEqual(1);
    expect(dummyObjects[1].costs[0].what).toEqual(<StorageTag>StorageTag[<string>ammunition]);
  });

  it('Map with Innovations', () => {
    const innovation1: Innovation = new Innovation('Innovation 1', 'to use', InnovationTag.SCULPURE_CONSEQUENCE, [InnovationTag.FAITH], false);
    const innovation2: Innovation = new Innovation('Innovation 2', 'used', InnovationTag.SCULPURE_CONSEQUENCE, [InnovationTag.FAITH], false);

    map1.set(innovation1, [2]);
    map1.set(innovation2, [4]);

    map2.set(innovation1, [1]);

    fullMap.set(equipment1, map1);
    fullMap.set(equipment2, map2);

    const dummyObjects: { equipment: Equipment, costs: [{ amount: number, what: any }] }[] = pipe.transform(fullMap);
    expect(dummyObjects.length).toEqual(2);
    expect(dummyObjects[0].equipment).toBe(equipment1);
    expect(dummyObjects[0].costs.length).toEqual(2);
    expect(dummyObjects[0].costs[0].what).toEqual(innovation1);
    expect(dummyObjects[0].costs[1].what).toEqual(innovation2);
    expect(dummyObjects[1].equipment).toBe(equipment2);
    expect(dummyObjects[1].costs.length).toEqual(1);
    expect(dummyObjects[1].costs[0].what).toEqual(innovation1);
  });

  it('Map with StorageTag', () => {
    const storageTag1: StorageTag = StorageTag.AXE;
    const storageTag2: StorageTag = StorageTag.AMMUNITION;

    map1.set(storageTag1, [2]);
    map1.set(storageTag2, [4]);

    map2.set(storageTag1, [1]);

    fullMap.set(equipment1, map1);
    fullMap.set(equipment2, map2);

    const dummyObjects: { equipment: Equipment, costs: [{ amount: number, what: any }] }[] = pipe.transform(fullMap);
    expect(dummyObjects.length).toEqual(2);
    expect(dummyObjects[0].equipment).toBe(equipment1);
    expect(dummyObjects[0].costs.length).toEqual(2);
    expect(dummyObjects[0].costs[0].what).toEqual(StorageTag[StorageTag.AXE]);
    expect(dummyObjects[0].costs[1].what).toEqual(StorageTag[StorageTag.AMMUNITION]);
    expect(dummyObjects[1].equipment).toBe(equipment2);
    expect(dummyObjects[1].costs.length).toEqual(1);
    expect(dummyObjects[1].costs[0].what).toEqual(StorageTag[StorageTag.AXE]);
  });

  it('Map with Mixed Elements', () => {
    const storageTag: StorageTag = StorageTag.AXE;
    const innovation: Innovation = new Innovation('Innovation 1', 'to use', InnovationTag.SCULPURE_CONSEQUENCE, [InnovationTag.FAITH], false);
    const arrow: string = 'ARROW';

    map1.set(storageTag, [2]);
    map1.set(innovation, [4]);

    map2.set(arrow, [1]);

    fullMap.set(equipment1, map1);
    fullMap.set(equipment2, map2);

    const dummyObjects: { equipment: Equipment, costs: [{ amount: number, what: any }] }[] = pipe.transform(fullMap);
    expect(dummyObjects.length).toEqual(2);
    expect(dummyObjects[0].equipment).toBe(equipment1);
    expect(dummyObjects[0].costs.length).toEqual(2);
    expect(dummyObjects[0].costs[0].what).toEqual(StorageTag[StorageTag.AXE]);
    expect(dummyObjects[0].costs[1].what).toEqual(innovation);
    expect(dummyObjects[1].equipment).toBe(equipment2);
    expect(dummyObjects[1].costs.length).toEqual(1);
    expect(dummyObjects[1].costs[0].what).toEqual(<StorageTag>StorageTag[<string>arrow]);
  });
})
;

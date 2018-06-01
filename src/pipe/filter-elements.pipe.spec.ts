import { FilterElementsPipe } from './filter-elements.pipe';
import { Innovation, InnovationTag } from '../model/innovation';

describe('Pipe: filterElementsPipe', () => {
  let pipe: FilterElementsPipe;
  let testList: { amount: number[], what: any }[];
  const ammunition: String = 'AMMUNITION';
  const arrow: String = 'ARROW';
  const innovation: Innovation = new Innovation('Innovation 1', 'innovated',
    InnovationTag.SCULPURE_CONSEQUENCE, [InnovationTag.FAITH], false);

  beforeEach(() => {
    pipe = new FilterElementsPipe();
    testList = [];

    testList.push({
      amount: [1],
      what: ammunition,
    });

    testList.push({
      amount: [2, 1],
      what: arrow,
    });

    testList.push({
      amount: [3, 2],
      what: innovation,
    });
  });

  it('Default', () => {
    const dummyObjects: { amount: number[], what: any }[] = pipe.transform(testList);
    expect(dummyObjects.length).toEqual(2);
    expect(dummyObjects[0].what).toBe(ammunition);
    expect(dummyObjects[1].what).toBe(arrow);
  });

  it('Object', () => {
    const dummyObjects: { amount: number[], what: any }[] = pipe.transform(testList, 'object');
    expect(dummyObjects.length).toEqual(1);
    expect(dummyObjects[0].what).toBe(innovation);
  });

  it('or_one', () => {
    const dummyObjects: { amount: number[], what: any }[] = pipe.transform(testList, 'or_one');
    expect(dummyObjects.length).toEqual(1);
    expect(dummyObjects[0].what).toBe(arrow);
  });

  it('or_two', () => {
    const dummyObjects: { amount: number[], what: any }[] = pipe.transform(testList, 'or_two');
    expect(dummyObjects.length).toEqual(1);
    expect(dummyObjects[0].what).toBe(innovation);
  });

});

import { RemoveWhitespacePipe } from './remove_whitespace.pipe';

describe('Pipe: removeWhitespacePipe', () => {
  let pipe: RemoveWhitespacePipe;

  beforeEach(() => {
    pipe = new RemoveWhitespacePipe();
  });

  it('No Whitespaces', () => {
    const testString = 'AllWithoutWhitespacesAREHEREAVAILABLE';
    const transformedString = pipe.transform(testString);
    expect(transformedString).toEqual(testString);
  });

  it('Remove Whitespaces', () => {
    const testString = 'All With Whitespaces ARE HERE AVAILABLE';
    const expectedString = 'AllWithWhitespacesAREHEREAVAILABLE';
    const transformedString = pipe.transform(testString);
    expect(transformedString).toEqual(expectedString);
  });

});

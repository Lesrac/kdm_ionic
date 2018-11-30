import { RemoveWhitespacePipe } from './remove-whitespace.pipe';
describe('Pipe: removeWhitespacePipe', () => {
    let pipe;
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
//# sourceMappingURL=remove-whitespace.pipe.spec.js.map
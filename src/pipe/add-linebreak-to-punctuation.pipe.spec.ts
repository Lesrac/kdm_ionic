import { AddLinebreakToPunctuationPipe } from './add-linebreak-to-punctuation.pipe';

describe('Pipe: addLinebreakToPunctuationPipe', () => {
  let pipe: AddLinebreakToPunctuationPipe;

  beforeEach(() => {
    pipe = new AddLinebreakToPunctuationPipe();
  });

  it('Not changed Text', () => {
    const text = 'Hello, to the new World';
    const textCopy = text;
    expect(pipe.transform(text)).toEqual(textCopy);
  });

  it('Replace .', () => {
    const text = 'Hello to the new World. All is new.';
    const textCopy = `Hello to the new World.
All is new.`;
    expect(pipe.transform(text)).toEqual(textCopy);
  });

  it('Replace !', () => {
    const text = 'Hello to the new World! All is new!';
    const textCopy = `Hello to the new World!
All is new!`;
    expect(pipe.transform(text)).toEqual(textCopy);
  });

  it('Replace ?', () => {
    const text = 'Hello to the new World? All is new?';
    const textCopy = `Hello to the new World?
All is new?`;
    expect(pipe.transform(text)).toEqual(textCopy);
  });

  it('Replace multiple punctuation marks', () => {
    const text = 'Hello to the new World? All is new! Nothing has changed. But be welcome with us.?!';
    const textCopy = `Hello to the new World?
All is new!
Nothing has changed.
But be welcome with us.?!`;
    expect(pipe.transform(text)).toEqual(textCopy);
  });

});

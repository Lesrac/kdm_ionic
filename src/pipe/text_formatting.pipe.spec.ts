import { inject } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { TextFormattingPipe } from './text_formatting.pipe';
import { SecurityContext } from '@angular/core';

describe('Pipe: textFormattingPipe', () => {

  it('Keep Text', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe: TextFormattingPipe = new TextFormattingPipe(domSanitizer);
    const text: string = 'This text keeps the same. There are no changes (because) nothings there to ' +
      'be changed. (not a single) Element <because> everything is fine </because>! good.';
    const safeResourceHTML = pipe.transform(text);
    const sanitizedValue = domSanitizer.sanitize(SecurityContext.HTML, safeResourceHTML);
    expect(sanitizedValue).toEqual(text);
  }));

  it('Keep Text, that does not need this pipe', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe: TextFormattingPipe = new TextFormattingPipe(domSanitizer);
    const text: string = 'This text keeps the same. There are no changes because nothings there to ' +
      'be changed. not a single Element <because> everything is fine </because>! good.';
    const safeResourceHTML = pipe.transform(text);
    const sanitizedValue = domSanitizer.sanitize(SecurityContext.HTML, safeResourceHTML);
    expect(sanitizedValue).toEqual(text);
  }));

  it('Replace ()', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe: TextFormattingPipe = new TextFormattingPipe(domSanitizer);
    const text: string = 'All the ()() need to be replaced.' +
      ' (Because) () are not allowed here.';
    const replacedText: string = 'All the  need to be replaced.' +
      ' (Because)  are not allowed here.';
    const safeResourceHTML = pipe.transform(text);
    const sanitizedValue = domSanitizer.sanitize(SecurityContext.HTML, safeResourceHTML);
    expect(sanitizedValue).toEqual(replacedText);
  }));

  it('Replace Milestones', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe: TextFormattingPipe = new TextFormattingPipe(domSanitizer);
    const text: string = 'All the (milestone)(milestone) need to be replaced.' +
      ' (Because) (milestone) are not allowed here.';
    const replacedText: string = 'All the <br/><br/><ion-icon name="book" role="img" class="icon icon-md ion-md-book"' +
      ' aria-label="book" ng-reflect-name="book"></ion-icon><ion-icon name="book" role="img" ' +
      'class="icon icon-md ion-md-book" aria-label="book" ng-reflect-name="book"></ion-icon>' +
      ' need to be replaced. (Because) <br/><br/><ion-icon name="book" ' +
      'role="img" class="icon icon-md ion-md-book" ' +
      'aria-label="book" ng-reflect-name="book"></ion-icon> are not allowed here.';
    const safeResourceHTML = pipe.transform(text);
    const sanitizedValue = domSanitizer.sanitize(SecurityContext.HTML, safeResourceHTML);
    expect(sanitizedValue).toEqual(replacedText);
  }));

  it('Replace Milestones, milestone after milestone always gets <br/>', inject([DomSanitizer],
    (domSanitizer: DomSanitizer) => {
      const pipe: TextFormattingPipe = new TextFormattingPipe(domSanitizer);
      const text: string = 'All the (milestone)(milestone) need to be replaced.' +
        ' Because (milestone) are not allowed here.';
      const replacedText: string = 'All the <br/><br/><ion-icon name="book" role="img" ' +
        'class="icon icon-md ion-md-book" aria-label="book" ng-reflect-name="book"></ion-icon><ion-icon ' +
        'name="book" role="img" class="icon icon-md ion-md-book" aria-label="book" ng-reflect-name="book"></ion-icon>' +
        ' need to be replaced. Because <ion-icon name="book" ' +
        'role="img" class="icon icon-md ion-md-book" ' +
        'aria-label="book" ng-reflect-name="book"></ion-icon> are not allowed here.';
      const safeResourceHTML = pipe.transform(text);
      const sanitizedValue = domSanitizer.sanitize(SecurityContext.HTML, safeResourceHTML);
      expect(sanitizedValue).toEqual(replacedText);
    }));

  it('Replace MilestoneNLs', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe: TextFormattingPipe = new TextFormattingPipe(domSanitizer);
    const text: string = 'All the (milestoneNL)(milestoneNL) need to be replaced.' +
      ' (Because) (milestoneNL) are not allowed here.';
    const replacedText: string = 'All the <ion-icon name="book" role="img" class="icon icon-md ion-md-book"' +
      ' aria-label="book" ng-reflect-name="book"></ion-icon><ion-icon name="book" role="img" ' +
      'class="icon icon-md ion-md-book" aria-label="book" ng-reflect-name="book"></ion-icon>' +
      ' need to be replaced. (Because) <ion-icon name="book" role="img" class="icon icon-md ion-md-book" ' +
      'aria-label="book" ng-reflect-name="book"></ion-icon> are not allowed here.';
    const safeResourceHTML = pipe.transform(text);
    const sanitizedValue = domSanitizer.sanitize(SecurityContext.HTML, safeResourceHTML);
    expect(sanitizedValue).toEqual(replacedText);
  }));

  it('Replace *', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe: TextFormattingPipe = new TextFormattingPipe(domSanitizer);
    const text: string = 'All the (*)(*) need to be replaced.' +
      ' Because (*) are not allowed here.';
    const replacedText: string = 'All the <ion-icon name="star" role="img" ' +
      'class="icon icon-md ion-md-star" aria-label="star" ng-reflect-name="star"></ion-icon><ion-icon ' +
      'name="star" role="img" class="icon icon-md ion-md-star" aria-label="star" ng-reflect-name="star"></ion-icon>' +
      ' need to be replaced. Because <ion-icon name="star" role="img" ' +
      'class="icon icon-md ion-md-star" aria-label="star" ng-reflect-name="star"></ion-icon> are not allowed here.';
    const safeResourceHTML = pipe.transform(text);
    const sanitizedValue = domSanitizer.sanitize(SecurityContext.HTML, safeResourceHTML);
    expect(sanitizedValue).toEqual(replacedText);
  }));

  it('Replace shieldone', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe: TextFormattingPipe = new TextFormattingPipe(domSanitizer);
    const text: string = 'All the (shieldone)(shieldone) need to be replaced.' +
      ' Because (shieldone) are not allowed here.';
    const replacedText: string = 'All the <ion-icon name="kdmf-shieldone" role="img" ' +
      'class="icon icon-md ion-md-kdmf-shieldone" aria-label="kdmf shieldone" ' +
      'ng-reflect-name="kdmf-shieldone"></ion-icon><ion-icon name="kdmf-shieldone" role="img" ' +
      'class="icon icon-md ion-md-kdmf-shieldone" aria-label="kdmf shieldone" ' +
      'ng-reflect-name="kdmf-shieldone"></ion-icon>' +
      ' need to be replaced. Because <ion-icon name="kdmf-shieldone" role="img" ' +
      'class="icon icon-md ion-md-kdmf-shieldone" aria-label="kdmf shieldone" ' +
      'ng-reflect-name="kdmf-shieldone"></ion-icon> are not allowed here.';
    const safeResourceHTML = pipe.transform(text);
    const sanitizedValue = domSanitizer.sanitize(SecurityContext.HTML, safeResourceHTML);
    expect(sanitizedValue).toEqual(replacedText);
  }));

  it('Replace br', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe: TextFormattingPipe = new TextFormattingPipe(domSanitizer);
    const text: string = 'All the (br)(br) need to be replaced.' +
      ' Because (br) are not allowed here.';
    const replacedText: string = 'All the <br/><br/><br/><br/>' +
      ' need to be replaced. Because <br/><br/> are not allowed here.';
    const safeResourceHTML = pipe.transform(text);
    const sanitizedValue = domSanitizer.sanitize(SecurityContext.HTML, safeResourceHTML);
    expect(sanitizedValue).toEqual(replacedText);
  }));

  it('Replace br1', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe: TextFormattingPipe = new TextFormattingPipe(domSanitizer);
    const text: string = 'All the (br1)(br1) need to be replaced.' +
      ' Because (br1) are not allowed here.';
    const replacedText: string = 'All the <br/><br/>' +
      ' need to be replaced. Because <br/> are not allowed here.';
    const safeResourceHTML = pipe.transform(text);
    const sanitizedValue = domSanitizer.sanitize(SecurityContext.HTML, safeResourceHTML);
    expect(sanitizedValue).toEqual(replacedText);
  }));

  it('Replace numbers', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe: TextFormattingPipe = new TextFormattingPipe(domSanitizer);
    const text: string = 'All the (10+)(1) need to be replaced.' +
      ' Because (1-5) are not allowed here.';
    const replacedText: string = 'All the <br/><br/><b>10+</b><br/><br/><b>1</b>' +
      ' need to be replaced. Because <br/><br/><b>1-5</b> are not allowed here.';
    const safeResourceHTML = pipe.transform(text);
    const sanitizedValue = domSanitizer.sanitize(SecurityContext.HTML, safeResourceHTML);
    expect(sanitizedValue).toEqual(replacedText);
  }));

});

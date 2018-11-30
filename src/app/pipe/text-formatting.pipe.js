var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
let TextFormattingPipe = class TextFormattingPipe {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        this.doubleBreak = '<br/><br/>';
        this.break = '<br/>';
        this.milestone = '<ion-icon name="book" role="img" class="icon icon-md ion-md-book" ' +
            'aria-label="book" ng-reflect-name="book"></ion-icon>';
    }
    transform(value, ...args) {
        const regex = new RegExp(/\((.*?)\)/, 'g');
        const regexRemoveParenthesis = new RegExp(/^\(|\)$/g);
        const matches = value.match(regex);
        let text = value;
        if (matches != null) {
            matches.forEach((match, index) => {
                const matchesWithoutParenthesis = match.replace(regexRemoveParenthesis, '');
                if (!matchesWithoutParenthesis) {
                    text = text.replace(match, '');
                }
                else if ('br' === matchesWithoutParenthesis) {
                    text = text.replace(match, this.doubleBreak);
                }
                else if ('br1' === matchesWithoutParenthesis) {
                    text = text.replace(match, this.break);
                }
                else if (Number(matchesWithoutParenthesis) || Number(matchesWithoutParenthesis[0]) ||
                    Number(matchesWithoutParenthesis[1]) || Number(matchesWithoutParenthesis[2])) {
                    text = text.replace(match, this.doubleBreak + '<b>' + matchesWithoutParenthesis + '</b>');
                }
                else if ('milestone' === matchesWithoutParenthesis) {
                    let replaceText = '';
                    if (index > 0) {
                        const previousMatchValue = matches[index - 1].replace(regexRemoveParenthesis, '');
                        if (previousMatchValue !== matchesWithoutParenthesis) {
                            replaceText += this.doubleBreak;
                        }
                    }
                    else {
                        replaceText += this.doubleBreak;
                    }
                    text = text.replace(match, replaceText + this.milestone);
                }
                else if ('milestoneNL' === matchesWithoutParenthesis) {
                    text = text.replace(match, this.milestone);
                }
                else if ('milestonebox' === matchesWithoutParenthesis) {
                    // TODO: milestonebox image
                    text = text.replace(match, '<ion-icon name="kdmf-square-black" role="img" ' +
                        'class="icon icon-md ion-md-kdmf-square-black" ' +
                        'aria-label="kdmf square black" ng-reflect-name="kdmf-square-black"></ion-icon>');
                }
                else if ('*' === matchesWithoutParenthesis) {
                    text = text.replace(match, '<ion-icon name="star" role="img" ' +
                        'class="icon icon-md ion-md-star" aria-label="star" ng-reflect-name="star"></ion-icon>');
                }
                else if ('shieldone' === matchesWithoutParenthesis) {
                    text = text.replace(match, '<ion-icon name="kdmf-shieldone" role="img" ' +
                        'class="icon icon-md ion-md-kdmf-shieldone" aria-label="kdmf shieldone" ' +
                        'ng-reflect-name="kdmf-shieldone"></ion-icon>');
                }
                else if ('shieldtwo' === matchesWithoutParenthesis) {
                    text = text.replace(match, '<ion-icon name="kdmf-shieldtwo" role="img" ' +
                        'class="icon icon-md ion-md-kdmf-shieldtwo" aria-label="kdmf shieldtwo" ' +
                        'ng-reflect-name="kdmf-shieldtwo"></ion-icon>');
                }
                else if ('shieldthree' === matchesWithoutParenthesis) {
                    text = text.replace(match, '<ion-icon name="kdmf-shieldthree" role="img" ' +
                        'class="icon icon-md ion-md-kdmf-shieldthree" aria-label="kdmf shieldthree" ' +
                        'ng-reflect-name="kdmf-shieldthree"></ion-icon>');
                }
                else if ('flash' === matchesWithoutParenthesis) {
                    text = text.replace(match, '<ion-icon name="flash" role="img" ' +
                        'class="icon icon-md ion-md-flash" aria-label="flash" ng-reflect-name="flash"></ion-icon>');
                }
                else if ('headList' === matchesWithoutParenthesis) {
                    text = text.replace(match, this.doubleBreak + '<ion-icon name="kdmf-head" role="img" ' +
                        'class="icon icon-md ion-md-kdmf-head" aria-label="kdmf head" ng-reflect-name="kdmf-head"></ion-icon>');
                }
                else if ('waistList' === matchesWithoutParenthesis) {
                    text = text.replace(match, this.doubleBreak + '<ion-icon name="kdmf-waist" role="img" ' +
                        'class="icon icon-md ion-md-kdmf-waist" aria-label="kdmf waist" ng-reflect-name="kdmf-waist"></ion-icon>');
                }
                else if ('legsList' === matchesWithoutParenthesis) {
                    text = text.replace(match, this.doubleBreak + '<ion-icon name="kdmf-legs" role="img" ' +
                        'class="icon icon-md ion-md-kdmf-legs" aria-label="kdmf legs" ng-reflect-name="kdmf-legs"></ion-icon>');
                }
                else if ('armsList' === matchesWithoutParenthesis) {
                    text = text.replace(match, this.doubleBreak + '<ion-icon name="kdmf-arms" role="img" ' +
                        'class="icon icon-md ion-md-kdmf-arms" aria-label="kdmf arms" ng-reflect-name="kdmf-arms"></ion-icon>');
                }
                else if ('bodyList' === matchesWithoutParenthesis) {
                    text = text.replace(match, this.doubleBreak + '<ion-icon name="kdmf-body" role="img" ' +
                        'class="icon icon-md ion-md-kdmf-body" aria-label="kdmf body" ng-reflect-name="kdmf-body"></ion-icon>');
                }
                else if ('horse' === matchesWithoutParenthesis) {
                    text = text.replace(match, '<ion-icon name="kdmf-horse" role="img" ' +
                        'class="icon icon-md ion-md-kdmf-horse" aria-label="kdmf horse" ng-reflect-name="kdmf-horse"></ion-icon>');
                }
                else if ('eyered' === matchesWithoutParenthesis) {
                    text = text.replace(match, '<ion-icon name="kdmf-eyered" role="img" ' +
                        'class="icon icon-md ion-md-kdmf-eyered" aria-label="kdmf eyered" ' +
                        'ng-reflect-name="kdmf-eyered"></ion-icon>');
                }
                else if ('eyeblue' === matchesWithoutParenthesis) {
                    text = text.replace(match, '<ion-icon name="kdmf-eyeblue" role="img" ' +
                        'class="icon icon-md ion-md-kdmf-eyeblue" aria-label="kdmf eyeblue" ' +
                        'ng-reflect-name="kdmf-eyeblue"></ion-icon>');
                }
                else if ('eyegreen' === matchesWithoutParenthesis) {
                    text = text.replace(match, '<ion-icon name="kdmf-eyegreen" role="img" ' +
                        'class="icon icon-md ion-md-kdmf-eyegreen" aria-label="kdmf eyegreen" ' +
                        'ng-reflect-name="kdmf-eyegreen"></ion-icon>');
                }
                else if ('puzzle blue' === matchesWithoutParenthesis) {
                    text = text.replace(match, '<ion-icon name="kdmf-puzzle-blue" role="img" ' +
                        'class="icon icon-md ion-md-kdmf-puzzle-blue" aria-label="kdmf puzzle blue" ' +
                        'ng-reflect-name="kdmf-puzzle-blue"></ion-icon>');
                }
                else if ('puzzle red' === matchesWithoutParenthesis) {
                    text = text.replace(match, '<ion-icon name="kdmf-puzzle-red" role="img" ' +
                        'class="icon icon-md ion-md-kdmf-puzzle-red" aria-label="kdmf puzzle red" ' +
                        'ng-reflect-name="kdmf-puzzle-red"></ion-icon>');
                }
                else if ('puzzle green' === matchesWithoutParenthesis) {
                    text = text.replace(match, '<ion-icon name="kdmf-puzzle-green" role="img" ' +
                        'class="icon icon-md ion-md-kdmf-puzzle-green" aria-label="kdmf puzzle green" ' +
                        'ng-reflect-name="kdmf-puzzle-green"></ion-icon>');
                }
                else if ('square blue' === matchesWithoutParenthesis) {
                    text = text.replace(match, '<ion-icon name="kdmf-square-blue" role="img" ' +
                        'class="icon icon-md ion-md-kdmf-square-blue" ' +
                        'aria-label="kdmf square blue" ng-reflect-name="kdmf-square-blue"></ion-icon>');
                }
                else if ('square red' === matchesWithoutParenthesis) {
                    text = text.replace(match, '<ion-icon name="kdmf-square-red" role="img" ' +
                        'class="icon icon-md ion-md-kdmf-square-red" aria-label="kdmf square red" ' +
                        'ng-reflect-name="kdmf-square-red"></ion-icon>');
                }
                else if ('square green' === matchesWithoutParenthesis) {
                    text = text.replace(match, '<ion-icon name="kdmf-square-green" role="img" ' +
                        'class="icon icon-md ion-md-kdmf-square-green" aria-label="kdmf square green" ' +
                        'ng-reflect-name="kdmf-square-green"></ion-icon>');
                }
            });
        }
        return this.sanitizer.bypassSecurityTrustHtml(text);
    }
};
TextFormattingPipe = __decorate([
    Pipe({ name: 'kdmTextFormatting' }),
    __metadata("design:paramtypes", [DomSanitizer])
], TextFormattingPipe);
export { TextFormattingPipe };
//# sourceMappingURL=text-formatting.pipe.js.map
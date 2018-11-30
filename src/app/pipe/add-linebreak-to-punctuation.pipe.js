var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
/**
 * Created by Daniel on 08.02.2017.
 */
let AddLinebreakToPunctuationPipe = class AddLinebreakToPunctuationPipe {
    transform(value, ...args) {
        let regex = new RegExp(/\.\s/, 'g');
        let text = value.replace(regex, '.\n');
        regex = new RegExp(/!\s/, 'g');
        text = text.replace(regex, '!\n');
        regex = new RegExp(/\?\s/, 'g');
        text = text.replace(regex, '?\n');
        return text;
    }
};
AddLinebreakToPunctuationPipe = __decorate([
    Pipe({ name: 'addLinebreakToPunctuationPipe' })
], AddLinebreakToPunctuationPipe);
export { AddLinebreakToPunctuationPipe };
//# sourceMappingURL=add-linebreak-to-punctuation.pipe.js.map
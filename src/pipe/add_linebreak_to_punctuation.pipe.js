"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
/**
 * Created by Daniel on 08.02.2017.
 */
var AddLinebreakToPunctuationPipe = (function () {
    function AddLinebreakToPunctuationPipe() {
    }
    AddLinebreakToPunctuationPipe.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var regex = new RegExp(/\.\s/, 'g');
        var text = value.replace(regex, '.\n');
        regex = new RegExp(/!\s/, 'g');
        text = text.replace(regex, '!\n');
        regex = new RegExp(/\?\s/, 'g');
        text = text.replace(regex, '?\n');
        return text;
    };
    AddLinebreakToPunctuationPipe = __decorate([
        core_1.Pipe({ name: 'addLinebreakToPunctuationPipe' })
    ], AddLinebreakToPunctuationPipe);
    return AddLinebreakToPunctuationPipe;
}());
exports.AddLinebreakToPunctuationPipe = AddLinebreakToPunctuationPipe;

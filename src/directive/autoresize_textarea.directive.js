"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by Daniel on 08.02.2017.
 * from: https://gist.github.com/maxt3r/2485356e91a1969bdb6cf54902e61165
 */
var core_1 = require('@angular/core');
var AutoresizeTextareaDirective = (function () {
    function AutoresizeTextareaDirective(element) {
        this.element = element;
    }
    AutoresizeTextareaDirective.prototype.onInput = function (textArea) {
        this.adjust();
    };
    AutoresizeTextareaDirective.prototype.ngOnInit = function () {
        this.adjust();
    };
    AutoresizeTextareaDirective.prototype.ngAfterViewChecked = function () {
        this.adjust();
    };
    AutoresizeTextareaDirective.prototype.adjust = function () {
        var ta = this.element.nativeElement.querySelector('textarea');
        if (ta) {
            ta.style.overflow = 'hidden';
            ta.style.height = 'auto';
            ta.style.height = ta.scrollHeight + 'px';
        }
    };
    __decorate([
        core_1.HostListener('input', ['$event.target'])
    ], AutoresizeTextareaDirective.prototype, "onInput", null);
    AutoresizeTextareaDirective = __decorate([
        core_1.Directive({
            selector: 'ion-textarea[autoresize]',
        })
    ], AutoresizeTextareaDirective);
    return AutoresizeTextareaDirective;
}());
exports.AutoresizeTextareaDirective = AutoresizeTextareaDirective;

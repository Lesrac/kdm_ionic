"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var disorders_component_1 = require('../disorder/disorders.component');
var fighting_art_component_1 = require('../fighting_art/fighting_art.component');
/**
 * Created by Daniel on 01.03.2017.
 */
var SurvivorPageComponent = (function () {
    function SurvivorPageComponent(navCtrl, modalCtrl, params, formBuilder) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.params = params;
        this.formBuilder = formBuilder;
        this.survivor = params.get('survivor');
    }
    SurvivorPageComponent.prototype.ngOnInit = function () {
        this.setupXP();
    };
    SurvivorPageComponent.prototype.increaseSurvival = function () {
        this.survivor.survival++;
    };
    SurvivorPageComponent.prototype.decreaseSurvival = function () {
        this.survivor.survival--;
    };
    SurvivorPageComponent.prototype.increaseAccuracy = function () {
        this.survivor.accuracy++;
    };
    SurvivorPageComponent.prototype.decreaseAccuracy = function () {
        this.survivor.accuracy--;
    };
    SurvivorPageComponent.prototype.increaseStrength = function () {
        this.survivor.strength++;
    };
    SurvivorPageComponent.prototype.decreaseStrength = function () {
        this.survivor.strength--;
    };
    SurvivorPageComponent.prototype.increaseEvasion = function () {
        this.survivor.evasion++;
    };
    SurvivorPageComponent.prototype.decreaseEvasion = function () {
        this.survivor.evasion--;
    };
    SurvivorPageComponent.prototype.increaseLuck = function () {
        this.survivor.luck++;
    };
    SurvivorPageComponent.prototype.decreaseLuck = function () {
        this.survivor.luck--;
    };
    SurvivorPageComponent.prototype.increaseSpeed = function () {
        this.survivor.speed++;
    };
    SurvivorPageComponent.prototype.decreaseSpeed = function () {
        this.survivor.speed--;
    };
    SurvivorPageComponent.prototype.increaseInsanity = function () {
        this.survivor.insanity++;
    };
    SurvivorPageComponent.prototype.decreaseInsanity = function () {
        this.survivor.insanity--;
    };
    SurvivorPageComponent.prototype.updateXP = function (event, control) {
        if (control.value) {
            this.survivor.experience++;
        }
        else {
            this.survivor.experience--;
        }
    };
    SurvivorPageComponent.prototype.showDisorders = function () {
        this.navCtrl.push(disorders_component_1.DisordersPageComponent, {
            disorders: this.survivor.disorders,
        }).then();
    };
    SurvivorPageComponent.prototype.showFightingArts = function () {
        this.navCtrl.push(fighting_art_component_1.FightingArtPageComponent, {
            fightingArts: this.survivor.fightingArts,
        }).then();
    };
    SurvivorPageComponent.prototype.setupXP = function () {
        var checkboxArray = new forms_1.FormArray([]);
        for (var i = 0; i < SurvivorPageComponent.MAX_XP; i++) {
            if (i < this.survivor.experience) {
                checkboxArray.push(new forms_1.FormControl(true));
            }
            else {
                checkboxArray.push(new forms_1.FormControl(false));
            }
        }
        this.xpGroup = this.formBuilder.group({ xps: checkboxArray });
    };
    SurvivorPageComponent.MAX_XP = 16;
    SurvivorPageComponent = __decorate([
        core_1.Component({
            selector: 'kdmf-page-survivor',
            templateUrl: 'survivor.html',
        })
    ], SurvivorPageComponent);
    return SurvivorPageComponent;
}());
exports.SurvivorPageComponent = SurvivorPageComponent;

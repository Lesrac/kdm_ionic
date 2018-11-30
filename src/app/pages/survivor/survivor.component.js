var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SurvivorPageComponent_1;
import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { ShowListComponent } from '../template/show-list.component';
import { ShowListTypes } from '../../model/show-list-types';
import { KDMDBService } from '../../service/kdm-db.service';
import { KDMObserverService } from '../../service/kdm-observer.service';
import { Subject } from 'rxjs';
import { EquipmentGridPageComponent } from '../equipment/equipment-grid.component';
/**
 * Created by Daniel on 01.03.2017.
 */
let SurvivorPageComponent = SurvivorPageComponent_1 = class SurvivorPageComponent {
    constructor(navCtrl, modalCtrl, params, formBuilder, kdmdbService, kdmObserver) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.params = params;
        this.formBuilder = formBuilder;
        this.kdmdbService = kdmdbService;
        this.kdmObserver = kdmObserver;
        this.courage = new Subject();
        this.understanding = new Subject();
        this.xp = new Subject();
        this.survivor = params.get('survivor');
        this.settlement = params.get('settlement');
        this.kdmObserver.registerObserverForSurvivorHappenings(this);
    }
    ngOnInit() {
        this.setupXP();
    }
    survivalChange(event) {
        if (typeof event === 'number') {
            this.survivor.survival = event;
        }
    }
    movementChange(event) {
        if (typeof event === 'number') {
            this.survivor.movement = event;
        }
    }
    accuracyChange(event) {
        if (typeof event === 'number') {
            this.survivor.accuracy = event;
        }
    }
    strengthChange(event) {
        if (typeof event === 'number') {
            this.survivor.strength = event;
        }
    }
    evasionChange(event) {
        if (typeof event === 'number') {
            this.survivor.evasion = event;
        }
    }
    luckChange(event) {
        if (typeof event === 'number') {
            this.survivor.luck = event;
        }
    }
    speedChange(event) {
        if (typeof event === 'number') {
            this.survivor.speed = event;
        }
    }
    insanityChange(event) {
        if (typeof event === 'number') {
            this.survivor.insanity = event;
        }
    }
    headArmorChange(event) {
        if (typeof event === 'number') {
            this.survivor.headArmor = event;
        }
    }
    armsArmorChange(event) {
        if (typeof event === 'number') {
            this.survivor.armsArmor = event;
        }
    }
    bodyArmorChange(event) {
        if (typeof event === 'number') {
            this.survivor.bodyArmor = event;
        }
    }
    waistArmorChange(event) {
        if (typeof event === 'number') {
            this.survivor.waistArmor = event;
        }
    }
    legsArmorChange(event) {
        if (typeof event === 'number') {
            this.survivor.legsArmor = event;
        }
    }
    understandingChange(event) {
        if (typeof event === 'number') {
            this.survivor.understanding = event;
            this.understanding.next(event);
        }
    }
    courageChange(event) {
        if (typeof event === 'number') {
            this.survivor.courage = event;
            this.courage.next(event);
        }
    }
    bleedingTokensChange(event) {
        if (typeof event === 'number') {
            this.survivor.bleedingTokens = event;
        }
    }
    weaponProficiencyXPChange(event) {
        if (typeof event === 'number') {
            this.survivor.weaponProficiencyXP = event;
        }
    }
    updateXP(event, control) {
        if (control.value) {
            this.survivor.experience++;
        }
        else {
            this.survivor.experience--;
        }
        this.xp.next(this.survivor.experience);
    }
    showDisorders() {
        this.navCtrl.push(ShowListComponent, {
            objects: this.survivor.disorders,
            type: ShowListTypes.DISORDER,
            settlement: this.settlement,
        }).then();
    }
    showFightingArts() {
        this.navCtrl.push(ShowListComponent, {
            objects: this.survivor.fightingArts,
            type: ShowListTypes.FIGHTINGART,
            settlement: this.settlement,
        }).then();
    }
    showEquipmentGrid() {
        this.navCtrl.push(EquipmentGridPageComponent, {
            survivor: this.survivor,
            settlement: this.settlement,
        }).then();
    }
    setupXP() {
        const checkboxArray = new FormArray([]);
        for (let i = 0; i < SurvivorPageComponent_1.MAX_XP; i++) {
            if (i < this.survivor.experience) {
                checkboxArray.push(new FormControl(true));
            }
            else {
                checkboxArray.push(new FormControl(false));
            }
        }
        this.xpGroup = this.formBuilder.group({ xps: checkboxArray });
    }
};
SurvivorPageComponent.MAX_XP = 16;
SurvivorPageComponent = SurvivorPageComponent_1 = __decorate([
    Component({
        selector: 'kdmf-page-survivor',
        templateUrl: 'survivor.component.html',
    }),
    __metadata("design:paramtypes", [NavController, ModalController, NavParams,
        FormBuilder, KDMDBService,
        KDMObserverService])
], SurvivorPageComponent);
export { SurvivorPageComponent };
//# sourceMappingURL=survivor.component.js.map
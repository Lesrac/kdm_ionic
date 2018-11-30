var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, KeyValueDiffers } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Survivor } from '../../model/survivor';
import { Settlement } from '../../model/settlement';
import { EquipmentListPageComponent } from './equipment_list.component';
import { Affinity, Direction } from '../../model/equipment';
/**
 * Created by Daniel on 06.01.2018.
 */
let EquipmentCardComponent = class EquipmentCardComponent {
    constructor(navCtrl, differs) {
        this.navCtrl = navCtrl;
        this.differs = differs;
        this.differ = differs.find({}).create();
    }
    ngOnInit() {
        this.setupColors();
    }
    ngDoCheck() {
        let changes = this.differ.diff(this.survivor.equipments.get(this.position));
        if (changes) {
            this.setupColors();
        }
    }
    setupColors() {
        const equipment = this.survivor.equipments.get(this.position);
        this.backgroundUp = {};
        this.backgroundDown = {};
        this.backgroundLeft = {};
        this.backgroundRight = {};
        if (equipment) {
            if (equipment.affinities.get(Affinity.BLUE)) {
                this.setAffinityColour(equipment, Affinity.BLUE, 'blue');
            }
            if (equipment.affinities.get(Affinity.GREEN)) {
                this.setAffinityColour(equipment, Affinity.GREEN, 'green');
            }
            if (equipment.affinities.get(Affinity.RED)) {
                this.setAffinityColour(equipment, Affinity.RED, 'red');
            }
        }
    }
    setAffinityColour(equipment, affinity, colour) {
        equipment.affinities.get(affinity).forEach(direction => {
            switch (direction) {
                case Direction.DOWN:
                    this.backgroundDown = { 'background': colour };
                    break;
                case Direction.LEFT:
                    this.backgroundLeft = { 'background': colour };
                    break;
                case Direction.RIGHT:
                    this.backgroundRight = { 'background': colour };
                    break;
                case Direction.UP:
                    this.backgroundUp = { 'background': colour };
                    break;
                default:
                    console.log('Direction not found: ' + direction);
            }
        });
    }
    selectEquipment() {
        this.navCtrl.push(EquipmentListPageComponent, {
            equipments: this.settlement.storages,
            survivor: this.survivor,
            position: this.position,
        }).then(() => {
            this.setupColors();
        });
    }
};
__decorate([
    Input(),
    __metadata("design:type", Survivor)
], EquipmentCardComponent.prototype, "survivor", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], EquipmentCardComponent.prototype, "position", void 0);
__decorate([
    Input(),
    __metadata("design:type", Settlement)
], EquipmentCardComponent.prototype, "settlement", void 0);
EquipmentCardComponent = __decorate([
    Component({
        selector: 'kdmf-equipment-card',
        templateUrl: 'equipment_card.component.html',
    }),
    __metadata("design:paramtypes", [NavController, KeyValueDiffers])
], EquipmentCardComponent);
export { EquipmentCardComponent };
//# sourceMappingURL=equipment_card.component.js.map
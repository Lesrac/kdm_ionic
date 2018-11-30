var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AlertController, ModalController, NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { SettlementPageComponent } from '../settlement/settlement.component';
import { KDMDataService } from '../../service/kdm-data.service';
import { CreateSettlementModalComponent } from '../settlement/create-settlement-modal.component';
/**
 * Created by Daniel on 27.01.2017.
 */
let SettlementsPageComponent = class SettlementsPageComponent {
    constructor(navCtrl, modalCtrl, alertCtrl, kdmService) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.kdmService = kdmService;
        this.settlements = [];
    }
    addSettlement() {
        console.log('add Settlement');
        let modal = this.modalCtrl.create(CreateSettlementModalComponent, {});
        modal.present().then();
    }
    ngOnInit() {
        this.kdmService.getSettlements().then(settlements => this.settlements = settlements);
    }
    goToDetail(settlement) {
        this.kdmService.getSettlement(settlement.id).then(settlementDesimplified => {
            this.navCtrl.push(SettlementPageComponent, {
                'settlement': settlementDesimplified,
            }).then();
        });
    }
    removeSettlement(settlement) {
        const alert = this.alertCtrl.create({
            title: 'Confirm deletion',
            message: 'Do you want to delete ' + settlement.name + '?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                    },
                },
                {
                    text: 'Yes',
                    handler: () => {
                        this.kdmService.removeSettlement(settlement);
                    },
                },
            ],
        });
        alert.present();
    }
};
SettlementsPageComponent = __decorate([
    Component({
        selector: 'kdmf-page-settlements',
        templateUrl: 'settlements.component.html',
    }),
    __metadata("design:paramtypes", [NavController, ModalController, AlertController,
        KDMDataService])
], SettlementsPageComponent);
export { SettlementsPageComponent };
//# sourceMappingURL=settlements.component.js.map
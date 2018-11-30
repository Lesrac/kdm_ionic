var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { KDMDataService } from '../../../service/kdm-data.service';
/**
 * Created by Daniel on 15.10.2017.
 */
let HuntEventTablePageComponent = class HuntEventTablePageComponent {
    constructor(navCtrl, kdmService) {
        this.navCtrl = navCtrl;
        this.kdmService = kdmService;
    }
    ngOnInit() {
        this.kdmService.getAllHuntEvents().then(huntEvents => {
            this.allHuntEvents = huntEvents;
            this.filteredHuntEvents = huntEvents;
        });
    }
    filterEventTable(event) {
        let val = event.target.value;
        if (val && val.trim() !== '') {
            this.filteredHuntEvents = this.allHuntEvents.filter(huntEvent => huntEvent.name.toLowerCase().includes(val.toLowerCase().trim()) ||
                huntEvent.rollResult === +val);
        }
        else {
            this.filteredHuntEvents = this.allHuntEvents;
        }
    }
};
HuntEventTablePageComponent = __decorate([
    Component({
        selector: 'kdmf-page-hunt-event-table',
        templateUrl: 'hunt-event-table.component.html',
    }),
    __metadata("design:paramtypes", [NavController, KDMDataService])
], HuntEventTablePageComponent);
export { HuntEventTablePageComponent };
//# sourceMappingURL=hunt-event-table.component.js.map
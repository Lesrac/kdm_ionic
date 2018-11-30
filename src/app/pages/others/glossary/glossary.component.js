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
let GlossaryPageComponent = class GlossaryPageComponent {
    constructor(navCtrl, kdmService) {
        this.navCtrl = navCtrl;
        this.kdmService = kdmService;
    }
    filterGlossary(event) {
        let val = event.target.value;
        if (val && val.trim() !== '') {
            this.filteredGlossaryEntries = this.allGlossaryEntries.filter(glossaryEntry => glossaryEntry.name.toLowerCase().includes(val.toLowerCase().trim()) ||
                glossaryEntry.description.toLowerCase().includes(val.toLowerCase().trim()));
        }
        else {
            this.filteredGlossaryEntries = this.allGlossaryEntries;
        }
    }
    ngOnInit() {
        this.kdmService.getAllGlossaryEntries().then(glossaryEntries => {
            this.allGlossaryEntries = glossaryEntries.sort(this.kdmService.sortByName);
            this.filteredGlossaryEntries = this.allGlossaryEntries;
        });
    }
};
GlossaryPageComponent = __decorate([
    Component({
        selector: 'kdmf-page-glossary',
        templateUrl: 'glossary.component.html',
    }),
    __metadata("design:paramtypes", [NavController, KDMDataService])
], GlossaryPageComponent);
export { GlossaryPageComponent };
//# sourceMappingURL=glossary.component.js.map
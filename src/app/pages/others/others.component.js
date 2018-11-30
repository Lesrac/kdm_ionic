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
import { BrainTraumaPageComponent } from './brain_trauma/brain-trauma.component';
import { GlossaryPageComponent } from './glossary/glossary.component';
import { HuntEventTablePageComponent } from './hunt_event_table/hunt-event-table.component';
import { SevereInjuriesPageComponent } from './severe_injuries/severe-injuries.component';
import { StoryEventsPageComponent } from './story_events/story-events.component';
import { ShowdownsPageComponent } from './showdown/showdowns.component';
let OthersPage = class OthersPage {
    constructor(navCtrl) {
        this.navCtrl = navCtrl;
    }
    goToDetail(otherElement) {
        switch (otherElement) {
            case 'braintrauma':
                this.navCtrl.push(BrainTraumaPageComponent, {}).then();
                break;
            case 'glossary':
                this.navCtrl.push(GlossaryPageComponent, {}).then();
                break;
            case 'hunteventtable':
                this.navCtrl.push(HuntEventTablePageComponent, {}).then();
                break;
            case 'severeinjuries':
                this.navCtrl.push(SevereInjuriesPageComponent, {}).then();
                break;
            case 'storyevents':
                this.navCtrl.push(StoryEventsPageComponent, {}).then();
                break;
            case 'showdowns':
                this.navCtrl.push(ShowdownsPageComponent, {}).then();
                break;
            default:
                console.log('no view defined for: ', otherElement);
        }
    }
};
OthersPage = __decorate([
    Component({
        selector: 'kdmf-page-others',
        templateUrl: 'others.component.html',
    }),
    __metadata("design:paramtypes", [NavController])
], OthersPage);
export { OthersPage };
//# sourceMappingURL=others.component.js.map
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
import { ViewController, NavParams } from 'ionic-angular';
import { SettlementTimeline } from '../../model/linking/settlement-timeline';
import { KDMDataService } from '../../service/kdm-data.service';
/**
 * Created by Daniel on 04.02.2017.
 */
let AddTimelineEventModalComponent = class AddTimelineEventModalComponent {
    constructor(viewCtrl, params, kdmData) {
        this.viewCtrl = viewCtrl;
        this.params = params;
        this.kdmData = kdmData;
        this.settlementTimeline = this.params.get('settlementTimeline');
        this.replaceableTimeline = this.params.get('replaceableTimeline');
        if (this.replaceableTimeline) {
            this.addChangeText = 'Change';
        }
        else {
            this.addChangeText = 'Add';
        }
    }
    ngAfterViewInit() {
        this.setup();
    }
    addClose() {
        const lanternEvent = this.lanternEvents.find((le) => le.name === this.eventName);
        if (lanternEvent) {
            const settlement = this.settlementTimeline[0].settlement;
            if (this.replaceableTimeline) {
                this.replaceableTimeline.timeline.lanternEvent = lanternEvent;
            }
            else {
                const maxPosition = this.settlementTimeline.length + 1;
                const timeline = {
                    position: maxPosition,
                    lanternEvent: lanternEvent,
                };
                this.settlementTimeline.push(new SettlementTimeline(settlement, timeline));
            }
        }
        this.close();
    }
    close() {
        this.viewCtrl.dismiss();
    }
    setup() {
        this.kdmData.getLanternEvents().then(lanternEvents => this.lanternEvents = lanternEvents.sort(this.kdmData.sortByName));
    }
};
AddTimelineEventModalComponent = __decorate([
    Component({
        selector: 'kdmf-add-timeline-event-modal',
        templateUrl: 'add-timeline-event-modal.component.html',
    }),
    __metadata("design:paramtypes", [ViewController, NavParams, KDMDataService])
], AddTimelineEventModalComponent);
export { AddTimelineEventModalComponent };
//# sourceMappingURL=add-timeline-event-modal.component.js.map
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
import { NavController, NavParams, ModalController, reorderArray } from 'ionic-angular';
import { TimelineEventModalComponent } from './timeline-event-modal.component';
import { AddTimelineEventModalComponent } from './add-timeline-event-modal.component';
/**
 * Created by Daniel on 12.02.2017.
 */
let TimelinePageComponent = class TimelinePageComponent {
    constructor(navCtrl, params, modalCtrl) {
        this.navCtrl = navCtrl;
        this.params = params;
        this.modalCtrl = modalCtrl;
        this.reorderActivityName = 'Reorder';
        this.reorderFlag = false;
        this.timeline = params.get('settlementTimeline');
    }
    timelineReached(event, settlementTimeline) {
        if (settlementTimeline.timeline.lanternEvent != null && settlementTimeline.reached) {
            let modal = this.modalCtrl.create(TimelineEventModalComponent, {
                lanternEvent: settlementTimeline.timeline.lanternEvent,
            });
            modal.present({
                ev: event,
            });
        }
        if (settlementTimeline.reached) {
            this.timeline.forEach(settlementTimelineInternal => {
                if (settlementTimelineInternal.timeline.position < settlementTimeline.timeline.position) {
                    settlementTimelineInternal.reached = true;
                }
            });
        }
        else {
            this.timeline.forEach(settlementTimelineInternal => {
                if (settlementTimelineInternal.timeline.position > settlementTimeline.timeline.position) {
                    settlementTimelineInternal.reached = false;
                }
            });
        }
    }
    changeReorder() {
        this.reorderFlag = !this.reorderFlag;
        if (this.reorderFlag) {
            this.reorderActivityName = 'Disable';
        }
        else {
            this.reorderActivityName = 'Reorder';
        }
    }
    reorderItems(indexes) {
        // change element position number
        if (indexes.from < indexes.to) {
            for (let i = 0; i <= indexes.to; i++) {
                const position = this.timeline[i].timeline.position;
                if (position > indexes.from + 1 && position <= indexes.to + 1) {
                    this.timeline[i].timeline.position--;
                }
            }
        }
        else {
            for (let i = indexes.from; i >= indexes.to; i--) {
                const position = this.timeline[i].timeline.position;
                if (position < indexes.from + 1 && position >= indexes.to + 1) {
                    this.timeline[i].timeline.position++;
                }
            }
        }
        this.timeline[indexes.from].timeline.position = indexes.to + 1;
        this.timeline = reorderArray(this.timeline, indexes);
    }
    addTimelineEvent() {
        let modal = this.modalCtrl.create(AddTimelineEventModalComponent, {
            settlementTimeline: this.timeline,
        });
        modal.present();
    }
    changeTimelineEvent(timelineevent) {
        let modal = this.modalCtrl.create(AddTimelineEventModalComponent, {
            settlementTimeline: this.timeline,
            replaceableTimeline: timelineevent,
        });
        modal.present();
    }
    removeTimelineEvent(timelineevent) {
        const index = this.timeline.findIndex(event => event === timelineevent);
        for (let i = index; i < this.timeline.length; i++) {
            this.timeline[i].timeline.position--;
        }
        this.timeline.splice(this.timeline.findIndex(event => event === timelineevent), 1);
    }
};
TimelinePageComponent = __decorate([
    Component({
        selector: 'kdmf-page-timeline',
        templateUrl: 'timeline.component.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, ModalController])
], TimelinePageComponent);
export { TimelinePageComponent };
//# sourceMappingURL=timeline.component.js.map
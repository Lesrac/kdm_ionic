"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var timeline_event_modal_component_1 = require('./timeline_event_modal.component');
/**
 * Created by Daniel on 12.02.2017.
 */
var TimelinePageComponent = (function () {
    function TimelinePageComponent(navCtrl, params, modalCtrl) {
        this.navCtrl = navCtrl;
        this.params = params;
        this.modalCtrl = modalCtrl;
        this.timeline = params.get('timeline');
    }
    TimelinePageComponent.prototype.timelineReached = function (event, timeline) {
        if (timeline.lanternEvent != null && timeline.reached) {
            var modal = this.modalCtrl.create(timeline_event_modal_component_1.TimelineEventModalComponent, {
                lanternEvent: timeline.lanternEvent,
            });
            modal.present({
                ev: event,
            });
        }
    };
    TimelinePageComponent = __decorate([
        core_1.Component({
            selector: 'kdmf-page-timeline',
            templateUrl: 'timeline.component.html',
        })
    ], TimelinePageComponent);
    return TimelinePageComponent;
}());
exports.TimelinePageComponent = TimelinePageComponent;

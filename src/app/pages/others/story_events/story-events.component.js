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
import { KDMDataService } from '../../../service/kdm-data.service';
import { ModalController } from 'ionic-angular';
import { TimelineEventModalComponent } from '../../timeline/timeline-event-modal.component';
/**
 * Created by Daniel on 15.10.2017.
 */
let StoryEventsPageComponent = class StoryEventsPageComponent {
    constructor(modalCtrl, kdmService) {
        this.modalCtrl = modalCtrl;
        this.kdmService = kdmService;
        this.allLanternEvents = [];
        this.filteredLanternEvents = [];
    }
    ngOnInit() {
        this.kdmService.getLanternEvents().then(lanternEvents => {
            this.allLanternEvents = lanternEvents.sort(this.kdmService.sortByName);
            this.filteredLanternEvents = this.allLanternEvents;
        });
    }
    filterLanternEvents(event) {
        let val = event.target.value;
        if (val && val.trim() !== '') {
            this.filteredLanternEvents = this.allLanternEvents.filter(storyEvent => storyEvent.name.toLowerCase().includes(val.toLowerCase().trim()) ||
                storyEvent.todo.toLowerCase().includes(val.toLowerCase().trim()) ||
                this.lanternStoryEventContainsText(storyEvent, val));
        }
        else {
            this.filteredLanternEvents = this.allLanternEvents;
        }
    }
    showDetail(lanternEvent) {
        let modal = this.modalCtrl.create(TimelineEventModalComponent, {
            lanternEvent: lanternEvent,
        });
        modal.present({
            ev: event,
        });
    }
    lanternStoryEventContainsText(lanternEvent, text) {
        return lanternEvent.storyEvents.some(storyEvent => storyEvent.description.toLowerCase().includes(text.toLowerCase().trim()) ||
            storyEvent.name.toLowerCase().includes(text.toLowerCase().trim()));
    }
};
StoryEventsPageComponent = __decorate([
    Component({
        selector: 'kdmf-page-story-events',
        templateUrl: 'story-events.component.html',
    }),
    __metadata("design:paramtypes", [ModalController, KDMDataService])
], StoryEventsPageComponent);
export { StoryEventsPageComponent };
//# sourceMappingURL=story-events.component.js.map
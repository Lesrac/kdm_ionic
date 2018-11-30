import { Component, OnInit } from '@angular/core';
import { KDMDataService } from '../../../service/kdm-data.service';
import { LanternEvent } from '../../../model/lantern-event';
import { TimelineEventModalComponent } from '../../timeline/timeline-event-modal.component';
import { ModalController } from '@ionic/angular';
import { ModalOptions } from '@ionic/core';

/**
 * Created by Daniel on 15.10.2017.
 */

@Component({
    selector: 'kdmf-page-story-events',
    templateUrl: 'story-events.component.html',
})
export class StoryEventsPageComponent implements OnInit {

    allLanternEvents: LanternEvent[] = [];
    filteredLanternEvents: LanternEvent[] = [];

    constructor(public modalCtrl: ModalController, private kdmService: KDMDataService) {
    }

    ngOnInit(): void {
        this.kdmService.getLanternEvents().then(lanternEvents => {
            this.allLanternEvents = lanternEvents.sort(this.kdmService.sortByName);
            this.filteredLanternEvents = this.allLanternEvents;
        });
    }

    filterLanternEvents(event: any): void {
        let val = event.target.value;
        if (val && val.trim() !== '') {
            this.filteredLanternEvents = this.allLanternEvents.filter(storyEvent =>
                storyEvent.name.toLowerCase().includes(val.toLowerCase().trim()) ||
                storyEvent.todo.toLowerCase().includes(val.toLowerCase().trim()) ||
                this.lanternStoryEventContainsText(storyEvent, val));
        } else {
            this.filteredLanternEvents = this.allLanternEvents;
        }
    }

    async showDetail(lanternEvent: LanternEvent): void {
        let modal = await this.modalCtrl.create({
            component: TimelineEventModalComponent,
            componentProps: {lanternEvent: lanternEvent}
        });
        await modal.present();
    }

    private lanternStoryEventContainsText(lanternEvent: LanternEvent, text: string): boolean {
        return lanternEvent.storyEvents.some(storyEvent =>
            storyEvent.description.toLowerCase().includes(text.toLowerCase().trim()) ||
            storyEvent.name.toLowerCase().includes(text.toLowerCase().trim()),
        );
    }

}

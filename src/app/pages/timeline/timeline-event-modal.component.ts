import { Component } from '@angular/core';
import { Input } from '@ionic/angular';
import { LanternEvent } from '../../model/lantern-event';

/**
 * Created by Daniel on 04.02.2017.
 */
@Component({
    selector: 'kdmf-timeline-event-modal',
    templateUrl: 'timeline-event-modal.component.html',
})
export class TimelineEventModalComponent {
    @Input
    lanternEvent: LanternEvent;
}

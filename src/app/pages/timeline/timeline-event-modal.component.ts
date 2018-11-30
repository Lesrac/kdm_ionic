import { Component, Input } from '@angular/core';
import { LanternEvent } from '../../model/lantern-event';

/**
 * Created by Daniel on 04.02.2017.
 */
@Component({
    selector: 'kdmf-timeline-event-modal', templateUrl: 'timeline-event-modal.component.html',
})
export class TimelineEventModalComponent {
    // TODO get the value in this component
    @Input()
    lanternEvent: LanternEvent;
}

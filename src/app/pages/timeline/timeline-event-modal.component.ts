import { Component, Input } from '@angular/core';
import { LanternEvent } from '../../model/lantern-event';
import { ModalController } from '@ionic/angular';

/**
 * Created by Daniel on 04.02.2017.
 */
@Component({
  selector: 'kdmf-timeline-event-modal', templateUrl: 'timeline-event-modal.component.html',
})
export class TimelineEventModalComponent {
  @Input()
  lanternEvent: LanternEvent;

  constructor(public modalCtrl: ModalController) {
  }

  close(): void {
    this.modalCtrl.dismiss().then();
  }
}
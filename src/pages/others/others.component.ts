import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { BrainTraumaPageComponent } from './brain_trauma/brain-trauma.component';
import { GlossaryPageComponent } from './glossary/glossary.component';
import { HuntEventTablePageComponent } from './hunt_event_table/hunt-event-table.component';
import { SevereInjuriesPageComponent } from './severe_injuries/severe-injuries.component';
import { StoryEventsPageComponent } from './story_events/story-events.component';
import { ShowdownsPageComponent } from './showdown/showdowns.component';

@Component({
  selector: 'kdmf-page-others',
  templateUrl: 'others.component.html',
})
export class OthersPage {

  constructor(public navCtrl: NavController) {
  }

  goToDetail(otherElement: string): void {
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
}

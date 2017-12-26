import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { BrainTraumaPageComponent } from './brain_trauma/brain_trauma.component';
import { GlossaryPageComponent } from './glossary/glossary.component';
import { HuntEventTablePageComponent } from './hunt_event_table/hunt_event_table.component';
import { SevereInjuriesPageComponent } from './severe_injuries/severe_injuries.component';
import { StoryEventsPageComponent } from './story_events/story_events.component';

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
      default:
        console.log('no view defined for: ', otherElement);
    }
  }
}

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StoryEvent } from '../../../model/story_event';

/**
 * Created by Daniel on 09.11.2017.
 */

@Component({
  selector: 'kdmf-page-story-event-detail',
  templateUrl: 'story_event_detail.component.html',
})
export class StoryEventDetailPageComponent {

  storyEvent: StoryEvent;

  constructor(public navCtrl: NavController, public params: NavParams) {
    this.storyEvent = params.get('storyEvent');
  }

}

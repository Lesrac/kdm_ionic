import { Component, OnInit } from '@angular/core';
import { KDMDataService } from '../../../service/kdm_data.service';
import { NavController } from 'ionic-angular';
import { StoryEvent } from '../../../model/story_event';
import { StoryEventDetailPageComponent } from './story_event_detail.component';

/**
 * Created by Daniel on 15.10.2017.
 */

@Component({
  selector: 'kdmf-page-story-events',
  templateUrl: 'story_events.component.html',
})
export class StoryEventsPageComponent implements OnInit {

  allStoryEvents: StoryEvent[] = [];
  filteredStoryEvents: StoryEvent[] = [];

  constructor(public navCtrl: NavController, private kdmService: KDMDataService) {
  }

  ngOnInit(): void {
    this.kdmService.getStoryEvents().then(storyEvents => {
      this.allStoryEvents = storyEvents.sort(this.kdmService.sortByName);
      this.filteredStoryEvents = this.allStoryEvents;
    });
  }

  filterStoryEvents(event: any): void {
    let val = event.target.value;
    if (val && val.trim() !== '') {
      this.filteredStoryEvents = this.allStoryEvents.filter(storyEvent =>
        storyEvent.name.toLowerCase().includes(val.toLowerCase().trim()) ||
        storyEvent.description.toLowerCase().includes(val.toLowerCase().trim()));
    } else {
      this.filteredStoryEvents = this.allStoryEvents;
    }
  }

  showDetail(storyEvent: StoryEvent): void {
    this.navCtrl.push(StoryEventDetailPageComponent, {
      storyEvent: storyEvent,
    }).then();
  }

}

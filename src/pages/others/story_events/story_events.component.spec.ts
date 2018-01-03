import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  App, Config, DeepLinker, DomController, Form, GestureController, IonicModule, Keyboard, NavController,
  NavParams, Platform,
} from 'ionic-angular';
import {
  AppMock, ConfigMock, DeepLinkerMock, KDMDataServiceMock, NavMock, NavParamsMock,
  PlatformMock,
} from '../../../mock/mocks';
import { KDMDataService } from '../../../service/kdm_data.service';
import { StoryEventsPageComponent } from './story_events.component';
import { StoryEvent } from '../../../model/story_event';
import { FormattedTextModalComponent } from '../../template/formatted_text_modal.component';

describe('Hunt Event Table Component', () => {

  let storyEventsPageComponent: StoryEventsPageComponent;
  let fixture: ComponentFixture<StoryEventsPageComponent>;
  let kdmServiceMock: KDMDataServiceMock;

  beforeEach(() => {
    kdmServiceMock = new KDMDataServiceMock();
    TestBed.configureTestingModule({
      declarations: [StoryEventsPageComponent],
      providers: [DomController, Keyboard, Form, GestureController,
        {provide: NavParams, useClass: NavParamsMock},
        {provide: NavController, useClass: NavMock},
        {provide: App, useClass: AppMock},
        {provide: Config, useClass: ConfigMock},
        {provide: DeepLinker, useClass: DeepLinkerMock},
        {provide: Platform, useClass: PlatformMock},
        {provide: KDMDataService, useValue: kdmServiceMock},
      ],
      imports: [IonicModule],
    });
    fixture = TestBed.createComponent(StoryEventsPageComponent);
    storyEventsPageComponent = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
    storyEventsPageComponent = null;
  });

  it('is created', () => {
    expect(fixture).toBeTruthy();
    expect(storyEventsPageComponent).toBeTruthy();
  });

  it('ngOnInit', fakeAsync(() => {
    const spy = spyOn(kdmServiceMock, 'getStoryEvents').and.callThrough();
    storyEventsPageComponent.ngOnInit();
    tick();
    expect(spy).toHaveBeenCalled();
    expect(storyEventsPageComponent.allStoryEvents).toEqual(storyEventsPageComponent.filteredStoryEvents);
  }));

  it('filter story events empty value', () => {
    const event = {
      target: {
        value: '',
      },
    };
    storyEventsPageComponent.allStoryEvents = [new StoryEvent('Story Event', 'dummy', 1)];
    storyEventsPageComponent.filteredStoryEvents = [new StoryEvent('Dummy', 'dummy', 2)];
    storyEventsPageComponent.filterStoryEvents(event);
    expect(storyEventsPageComponent.filteredStoryEvents).toEqual(storyEventsPageComponent.allStoryEvents);
  });

  it('filter story events filter value with found object', () => {
    const event = {
      target: {
        value: 'Story event',
      },
    };
    const storyEvent = new StoryEvent('Story Event 1', 'dummy', 1);
    const storyEvent2 = new StoryEvent('Story Event 2', 'dummy', 2);
    const storyEvent3 = new StoryEvent('Whaka', 'dummy', 3);
    storyEventsPageComponent.allStoryEvents = [storyEvent, storyEvent2, storyEvent3];
    storyEventsPageComponent.filterStoryEvents(event);
    expect(storyEventsPageComponent.filteredStoryEvents.length).toBe(2);
    expect(storyEventsPageComponent.filteredStoryEvents).toContain(storyEvent);
    expect(storyEventsPageComponent.filteredStoryEvents).toContain(storyEvent2);
  });

  it('filter story events filter value with no object found', () => {
    const event = {
      target: {
        value: 'bar',
      },
    };
    const storyEvent = new StoryEvent('Story Event 1', 'dummy', 1);
    const storyEvent2 = new StoryEvent('Story Event 2', 'dummy', 2);
    const storyEvent3 = new StoryEvent('Whaka', 'dummy', 3);
    storyEventsPageComponent.allStoryEvents = [storyEvent, storyEvent2, storyEvent3];
    storyEventsPageComponent.filterStoryEvents(event);
    expect(storyEventsPageComponent.filteredStoryEvents.length).toBe(0);
  });

  it('show detail', () => {
    const spy = spyOn(storyEventsPageComponent.navCtrl, 'push').and.callThrough();
    const storyEvent = new StoryEvent('Story Event', 'description', 1);
    storyEventsPageComponent.showDetail(storyEvent);
    expect(spy).toHaveBeenCalledWith(FormattedTextModalComponent, {
      title: storyEvent.name,
      text: storyEvent.description,
    });
  });

});

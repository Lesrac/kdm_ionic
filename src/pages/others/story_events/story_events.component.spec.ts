import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  App, Config, DeepLinker, DomController, Form, GestureController, IonicModule, Keyboard, Modal, ModalController,
  Platform,
} from 'ionic-angular';
import {
  AppMock, ConfigMock, DeepLinkerMock, KDMDataServiceMock, ModalControllerMock, ModalMock, PlatformMock,
} from '../../../mock/mocks';
import { KDMDataService } from '../../../service/kdm_data.service';
import { StoryEventsPageComponent } from './story_events.component';
import { LanternEvent } from '../../../model/lantern_event';
import { TimelineEventModalComponent } from '../../timeline/timeline_event_modal.component';

describe('Story Event Table Component', () => {

  let storyEventsPageComponent: StoryEventsPageComponent;
  let fixture: ComponentFixture<StoryEventsPageComponent>;
  let kdmServiceMock: KDMDataServiceMock;

  beforeEach(() => {
    kdmServiceMock = new KDMDataServiceMock();
    TestBed.configureTestingModule({
      declarations: [StoryEventsPageComponent],
      providers: [DomController, Keyboard, Form, GestureController,
        {provide: ModalController, useClass: ModalControllerMock},
        {provide: Modal, useClass: ModalMock},
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
    expect(storyEventsPageComponent.allLanternEvents).toEqual(storyEventsPageComponent.filteredLanternEvents);
  }));

  it('filter story events empty value', () => {
    const event = {
      target: {
        value: '',
      },
    };
    storyEventsPageComponent.allLanternEvents = [new LanternEvent('Story Event', 'dummy')];
    storyEventsPageComponent.filteredLanternEvents = [new LanternEvent('Dummy', 'dummy')];
    storyEventsPageComponent.filterLanternEvents(event);
    expect(storyEventsPageComponent.filteredLanternEvents).toEqual(storyEventsPageComponent.allLanternEvents);
  });

  it('filter story events filter value with found object', () => {
    const event = {
      target: {
        value: 'Story event',
      },
    };
    const storyEvent = new LanternEvent('Story Event 1', 'dummy');
    const storyEvent2 = new LanternEvent('Story Event 2', 'dummy');
    const storyEvent3 = new LanternEvent('Whaka', 'dummy');
    storyEventsPageComponent.allLanternEvents = [storyEvent, storyEvent2, storyEvent3];
    storyEventsPageComponent.filterLanternEvents(event);
    expect(storyEventsPageComponent.filteredLanternEvents.length).toBe(2);
    expect(storyEventsPageComponent.filteredLanternEvents).toContain(storyEvent);
    expect(storyEventsPageComponent.filteredLanternEvents).toContain(storyEvent2);
  });

  it('filter story events filter value with no object found', () => {
    const event = {
      target: {
        value: 'bar',
      },
    };
    const storyEvent = new LanternEvent('Story Event 1', 'dummy');
    const storyEvent2 = new LanternEvent('Story Event 2', 'dummy');
    const storyEvent3 = new LanternEvent('Whaka', 'dummy');
    storyEventsPageComponent.allLanternEvents = [storyEvent, storyEvent2, storyEvent3];
    storyEventsPageComponent.filterLanternEvents(event);
    expect(storyEventsPageComponent.filteredLanternEvents.length).toBe(0);
  });

  it('show detail', () => {
    const spy = spyOn(storyEventsPageComponent.modalCtrl, 'create').and.callThrough();
    const storyEvent = new LanternEvent('Story Event', 'description');
    storyEventsPageComponent.showDetail(storyEvent);
    expect(spy).toHaveBeenCalledWith(TimelineEventModalComponent, {
      lanternEvent: storyEvent,
    });
  });

});

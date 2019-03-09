import {
  Config, DomController, IonicModule, NavController, NavParams, Platform,
} from '@ionic/angular';
import {
  AppMock, ConfigMock, DeepLinkerMock, NavMock, NavParamsMock, PlatformMock, ViewControllerMock,
} from '../../mock/mocks';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimelineEventModalComponent } from './timeline-event-modal.component';
import { LanternEvent } from '../../model/lantern-event';
import { TextFormattingPipe } from '../../pipe/text-formatting.pipe';

describe('TimelineEventModalComponent', () => {
  let timelineEventModalComponent: TimelineEventModalComponent;
  let fixture: ComponentFixture<TimelineEventModalComponent>;

  let lanternEvent: LanternEvent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimelineEventModalComponent, TextFormattingPipe],
      providers: [DomController,
        {provide: NavParams, useClass: NavParamsMock},
        {provide: NavController, useClass: NavMock},
        {provide: Config, useClass: ConfigMock},
        {provide: Platform, useClass: PlatformMock},
      ],
      imports: [IonicModule],
    });
    lanternEvent = new LanternEvent('Dummy Lantern Event');
    NavParamsMock.setParams(lanternEvent);
    fixture = TestBed.createComponent(TimelineEventModalComponent);
    timelineEventModalComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    timelineEventModalComponent = null;
  });

  it('created', () => {
    expect(fixture).toBeTruthy();
    expect(timelineEventModalComponent).toBeTruthy();
    expect(timelineEventModalComponent.lanternEvent).toBe(lanternEvent);
  });

/*  it('close', () => {
    const spy = spyOn(timelineEventModalComponent.viewCtrl, 'dismiss');
    timelineEventModalComponent.close();
    expect(spy).toHaveBeenCalled();
  }); */

});

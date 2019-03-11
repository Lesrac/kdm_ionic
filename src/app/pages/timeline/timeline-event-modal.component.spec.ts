import { Config, DomController, IonicModule, NavController, Platform } from '@ionic/angular';
import { ConfigMock, NavMock, PlatformMock } from '../../mock/mocks';
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
        {provide: NavController, useClass: NavMock},
        {provide: Config, useClass: ConfigMock},
        {provide: Platform, useClass: PlatformMock},
      ],
      imports: [IonicModule],
    });
    lanternEvent = new LanternEvent('Dummy Lantern Event');
    fixture = TestBed.createComponent(TimelineEventModalComponent);
    timelineEventModalComponent = fixture.componentInstance;
    timelineEventModalComponent.lanternEvent = lanternEvent;
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

  it('close', () => {
    const spy = spyOn(timelineEventModalComponent.modalCtrl, 'dismiss').and.callThrough();
    timelineEventModalComponent.close();
    expect(spy).toHaveBeenCalled();
  });

});

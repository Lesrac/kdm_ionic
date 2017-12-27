import {
  App,
  Config, DeepLinker, DomController, Form, GestureController, IonicModule, Keyboard, Modal, ModalController,
  NavController, NavParams,
  Platform,
  ViewController,
} from 'ionic-angular';
import {
  AppMock, ConfigMock, DeepLinkerMock, KDMDBServiceMock, ModalControllerMock, ModalMock, NavMock, NavParamsMock,
  PlatformMock,
  ViewControllerMock,
} from '../../mock/mocks';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Settlement } from '../../model/settlement';
import { KDMDBService } from '../../service/kdm_db.service';
import { TimelinePageComponent } from './timeline.component';
import { SettlementTimeline } from '../../model/linking/settlement_timeline';
import { Timeline } from '../../model/timeline';
import { LanternEvent } from '../../model/lantern_event';
import { TimelineEventModalComponent } from './timeline_event_modal.component';
import { AddTimelineEventModalComponent } from './add_timeline_event_modal.component';
import { ReorderIndexes } from 'ionic-angular/components/item/item-reorder';

describe('TimelinePageComponent', () => {
  let timelinePageComponent: TimelinePageComponent;
  let fixture: ComponentFixture<TimelinePageComponent>;

  let kdmdbServiceMock: KDMDBServiceMock;
  let settlementTimelinePosition1: SettlementTimeline;
  let settlementTimelinePosition2: SettlementTimeline;
  let settlementTimelinePosition3: SettlementTimeline;
  let settlementTimelinePosition4: SettlementTimeline;
  let settlementTimelinePosition5: SettlementTimeline;
  let modalMock: ModalMock;

  beforeEach(() => {
    kdmdbServiceMock = new KDMDBServiceMock();
    modalMock = new ModalMock();
    TestBed.configureTestingModule({
      declarations: [TimelinePageComponent],
      providers: [DomController, Keyboard, Form, GestureController,
        {provide: NavParams, useClass: NavParamsMock},
        {provide: NavController, useClass: NavMock},
        {provide: App, useClass: AppMock},
        {provide: ModalController, useClass: ModalControllerMock},
        {provide: Modal, useClass: ModalMock},
        {provide: Config, useClass: ConfigMock},
        {provide: DeepLinker, useClass: DeepLinkerMock},
        {provide: Platform, useClass: PlatformMock},
        {provide: ViewController, useClass: ViewControllerMock},
        {provide: KDMDBService, useValue: kdmdbServiceMock},
      ],
      imports: [IonicModule],
    });
    const settlement = new Settlement('Dummy Settlement');
    const timeline = new Timeline();
    timeline.position = 1;
    settlementTimelinePosition1 = new SettlementTimeline(settlement, timeline);
    const timeline2 = new Timeline();
    timeline2.position = 2;
    settlementTimelinePosition2 = new SettlementTimeline(settlement, timeline2);
    const timeline3 = new Timeline();
    timeline3.position = 3;
    settlementTimelinePosition3 = new SettlementTimeline(settlement, timeline3);
    const timeline4 = new Timeline();
    timeline4.position = 4;
    timeline4.lanternEvent = new LanternEvent();
    settlementTimelinePosition4 = new SettlementTimeline(settlement, timeline4);
    const timeline5 = new Timeline();
    timeline5.position = 5;
    settlementTimelinePosition5 = new SettlementTimeline(settlement, timeline5);
    NavParamsMock.setParams([settlementTimelinePosition1, settlementTimelinePosition2,
      settlementTimelinePosition3, settlementTimelinePosition4, settlementTimelinePosition5]);
    fixture = TestBed.createComponent(TimelinePageComponent);
    timelinePageComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    timelinePageComponent = null;
  });

  it('created', () => {
    expect(fixture).toBeTruthy();
    expect(timelinePageComponent).toBeTruthy();
  });

  it('ionViewDidLeave', () => {
    const spy = spyOn(kdmdbServiceMock, 'saveSettlement');
    timelinePageComponent.ionViewDidLeave();
    expect(spy).toHaveBeenCalledWith(timelinePageComponent.timeline[0].settlement);
  });

  it('change reorder', () => {
    expect(timelinePageComponent.reorderActivityName).toEqual('Reorder');
    expect(timelinePageComponent.reorderFlag).toBeFalsy();
    timelinePageComponent.changeReorder();
    expect(timelinePageComponent.reorderActivityName).toEqual('Disable');
    expect(timelinePageComponent.reorderFlag).toBeTruthy();
    timelinePageComponent.changeReorder();
    expect(timelinePageComponent.reorderActivityName).toEqual('Reorder');
    expect(timelinePageComponent.reorderFlag).toBeFalsy();
  });

  it('timeline reached activate without lantern event', () => {
    event = new Event('event');
    settlementTimelinePosition3.reached = true;
    timelinePageComponent.timelineReached(event, settlementTimelinePosition3);
    expect(settlementTimelinePosition1.reached).toBeTruthy();
    expect(settlementTimelinePosition2.reached).toBeTruthy();
    expect(settlementTimelinePosition3.reached).toBeTruthy();
    expect(settlementTimelinePosition4.reached).toBeFalsy();
    expect(settlementTimelinePosition5.reached).toBeFalsy();
  });

  it('timeline reached deactivate without lantern event', () => {
    event = new Event('event');
    settlementTimelinePosition1.reached = true;
    settlementTimelinePosition2.reached = true;
    settlementTimelinePosition3.reached = false;
    settlementTimelinePosition4.reached = true;
    settlementTimelinePosition5.reached = true;
    timelinePageComponent.timelineReached(event, settlementTimelinePosition3);
    expect(settlementTimelinePosition1.reached).toBeTruthy();
    expect(settlementTimelinePosition2.reached).toBeTruthy();
    expect(settlementTimelinePosition3.reached).toBeFalsy();
    expect(settlementTimelinePosition4.reached).toBeFalsy();
    expect(settlementTimelinePosition5.reached).toBeFalsy();
  });

  it('timeline reached activate with lantern event', () => {
    const spy = spyOn(timelinePageComponent.modalCtrl, 'create').and.returnValue(modalMock);
    event = new Event('event');
    settlementTimelinePosition4.reached = true;
    timelinePageComponent.timelineReached(event, settlementTimelinePosition4);
    expect(settlementTimelinePosition1.reached).toBeTruthy();
    expect(settlementTimelinePosition2.reached).toBeTruthy();
    expect(settlementTimelinePosition3.reached).toBeTruthy();
    expect(settlementTimelinePosition4.reached).toBeTruthy();
    expect(settlementTimelinePosition5.reached).toBeFalsy();
    expect(spy).toHaveBeenCalledWith(TimelineEventModalComponent, {
      lanternEvent: settlementTimelinePosition4.timeline.lanternEvent
    })
  });

  it('timeline reached deactivate with lantern event', () => {
    const spy = spyOn(timelinePageComponent.modalCtrl, 'create').and.callThrough();
    event = new Event('event');
    settlementTimelinePosition1.reached = true;
    settlementTimelinePosition2.reached = true;
    settlementTimelinePosition3.reached = true;
    settlementTimelinePosition4.reached = false;
    settlementTimelinePosition5.reached = true;
    timelinePageComponent.timelineReached(event, settlementTimelinePosition4);
    expect(settlementTimelinePosition1.reached).toBeTruthy();
    expect(settlementTimelinePosition2.reached).toBeTruthy();
    expect(settlementTimelinePosition3.reached).toBeTruthy();
    expect(settlementTimelinePosition4.reached).toBeFalsy();
    expect(settlementTimelinePosition5.reached).toBeFalsy();
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('add timeline event', () => {
    const spy = spyOn(timelinePageComponent.modalCtrl, 'create').and.returnValue(modalMock);
    const spyModalPresent = spyOn(modalMock, 'present');
    timelinePageComponent.addTimelineEvent();
    expect(spy).toHaveBeenCalledWith(AddTimelineEventModalComponent, {
      settlementTimeline: timelinePageComponent.timeline,
    });
    expect(spyModalPresent).toHaveBeenCalled();
  });

  it('change timeline event', () => {
    const spy = spyOn(timelinePageComponent.modalCtrl, 'create').and.returnValue(modalMock);
    const spyModalPresent = spyOn(modalMock, 'present');
    timelinePageComponent.changeTimelineEvent(settlementTimelinePosition3);
    expect(spy).toHaveBeenCalledWith(AddTimelineEventModalComponent, {
      settlementTimeline: timelinePageComponent.timeline,
      replaceableTimeline: settlementTimelinePosition3,
    });
    expect(spyModalPresent).toHaveBeenCalled();
  });

  it('remove timeline event', () => {
    timelinePageComponent.removeTimelineEvent(settlementTimelinePosition3);
    expect(timelinePageComponent.timeline.length).toBe(4);
    expect(settlementTimelinePosition4.timeline.position).toBe(3);
    expect(settlementTimelinePosition5.timeline.position).toBe(4);
    expect(timelinePageComponent.timeline).toContain(settlementTimelinePosition1);
    expect(timelinePageComponent.timeline).toContain(settlementTimelinePosition2);
    expect(timelinePageComponent.timeline).toContain(settlementTimelinePosition4);
    expect(timelinePageComponent.timeline).toContain(settlementTimelinePosition5);
  });

  it('reorder timeline event in the middle, low to high', () => {
    const reorderIndex = new ReorderIndexes(1, 3);
    timelinePageComponent.reorderItems(reorderIndex);
    expect(settlementTimelinePosition1.timeline.position).toBe(1);
    expect(settlementTimelinePosition2.timeline.position).toBe(4);
    expect(settlementTimelinePosition3.timeline.position).toBe(2);
    expect(settlementTimelinePosition4.timeline.position).toBe(3);
    expect(settlementTimelinePosition5.timeline.position).toBe(5);
  });

  it('reorder timeline event at the start, low to high', () => {
    const reorderIndex = new ReorderIndexes(0, 3);
    timelinePageComponent.reorderItems(reorderIndex);
    expect(settlementTimelinePosition1.timeline.position).toBe(4);
    expect(settlementTimelinePosition2.timeline.position).toBe(1);
    expect(settlementTimelinePosition3.timeline.position).toBe(2);
    expect(settlementTimelinePosition4.timeline.position).toBe(3);
    expect(settlementTimelinePosition5.timeline.position).toBe(5);
  });

  it('reorder timeline event in the middle, high to low', () => {
    const reorderIndex = new ReorderIndexes(3, 1);
    timelinePageComponent.reorderItems(reorderIndex);
    expect(settlementTimelinePosition1.timeline.position).toBe(1);
    expect(settlementTimelinePosition2.timeline.position).toBe(3);
    expect(settlementTimelinePosition3.timeline.position).toBe(4);
    expect(settlementTimelinePosition4.timeline.position).toBe(2);
    expect(settlementTimelinePosition5.timeline.position).toBe(5);
  });

  it('reorder timeline event at the end, high to low', () => {
    const reorderIndex = new ReorderIndexes(4, 2);
    timelinePageComponent.reorderItems(reorderIndex);
    expect(settlementTimelinePosition1.timeline.position).toBe(1);
    expect(settlementTimelinePosition2.timeline.position).toBe(2);
    expect(settlementTimelinePosition3.timeline.position).toBe(4);
    expect(settlementTimelinePosition4.timeline.position).toBe(5);
    expect(settlementTimelinePosition5.timeline.position).toBe(3);
  });

});

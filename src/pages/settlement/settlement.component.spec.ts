import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  App,
  Config, DeepLinker, DomController, Form, GestureController, IonicModule, Keyboard, Modal, ModalController,
  NavController, NavParams,
  Platform,
} from 'ionic-angular';
import {
  AppMock, ConfigMock, DeepLinkerMock, KDMDataServiceMock, KDMDBServiceMock, KDMObserverServiceMock,
  KeyValueDiffersMock,
  ModalControllerMock, ModalMock, NavMock,
  NavParamsMock, PlatformMock,
} from '../../mock/mocks';
import { Settlement } from '../../model/settlement';
import { KDMDataService } from '../../service/kdm-data.service';
import { KDMDBService } from '../../service/kdm-db.service';
import { SettlementPageComponent } from './settlement.component';
import { KDMObserverService } from '../../service/kdm-observer.service';
import { KeyValueDiffers } from '@angular/core';
import { InputNumberComponent } from '../template/input-number.component';
import { Milestone, MilestoneType } from '../../model/milestone';
import { ComparableVisitorValue } from '../../model/visitor/comparable-visitor';
import { SettlementMilestone } from '../../model/linking/settlement-milestone';
import { TimelinePageComponent } from '../timeline/timeline.component';
import { SettlementTimeline } from '../../model/linking/settlement-timeline';
import { Timeline } from '../../model/timeline';
import { DefeatedMonsterPageComponent } from '../defeated_monster/defeated-monster.component';
import { ShowListComponent } from '../template/show-list.component';
import { ShowListTypes } from '../../model/show-list-types';
import { Innovation, InnovationTag } from '../../model/innovation';
import { Location } from '../../model/location';
import { PrinciplesPageComponent } from '../principle/principles.component';
import { StoragePageComponent } from '../storage/storage.component';
import { SettlementLanternEvent } from '../../model/linking/settlement-lantern-event';
import { LanternEvent } from '../../model/lantern-event';
import { TimelineEventModalComponent } from '../timeline/timeline-event-modal.component';
import { Equipment } from '../../model/equipment';

describe('Settlement Component', () => {

  let settlementPageComponent: SettlementPageComponent;
  let fixture: ComponentFixture<SettlementPageComponent>;

  let settlement: Settlement;
  let settlementMilestone: SettlementMilestone;
  let kdmDBServiceMock: KDMDBServiceMock;
  let kdmServiceMock: KDMDataServiceMock;

  beforeEach(() => {
    kdmDBServiceMock = new KDMDBServiceMock();
    kdmServiceMock = new KDMDataServiceMock();
    TestBed.configureTestingModule({
      declarations: [SettlementPageComponent, InputNumberComponent],
      providers: [DomController, Keyboard, Form, GestureController,
        {provide: KeyValueDiffers, useClass: KeyValueDiffersMock},
        {provide: NavParams, useClass: NavParamsMock},
        {provide: NavController, useClass: NavMock},
        {provide: App, useClass: AppMock},
        {provide: Config, useClass: ConfigMock},
        {provide: DeepLinker, useClass: DeepLinkerMock},
        {provide: ModalController, useClass: ModalControllerMock},
        {provide: Modal, useClass: ModalMock},
        {provide: Platform, useClass: PlatformMock},
        {provide: KDMDataService, useValue: kdmServiceMock},
        {provide: KDMDBService, useValue: kdmDBServiceMock},
        {provide: KDMObserverService, useClass: KDMObserverServiceMock},
      ],
      imports: [IonicModule],
    });
    const milestone = new Milestone(1, 'Milestone', 2, ComparableVisitorValue.EQ, 'POPULATION', MilestoneType.Basic);
    const timeline = new Timeline(1, new LanternEvent());
    settlement = new Settlement('Dummy Settlement');
    settlementMilestone = new SettlementMilestone(settlement, milestone);
    settlement.addMilestone(settlementMilestone);
    settlement.addTimelineItem(new SettlementTimeline(settlement, timeline));
    settlement.addLocation(new Location('Dummy Location', 'dummy',
      new Map<Equipment, Map<string | Innovation, [number]>>(), false));
    settlement.addInnovation(new Innovation('Dummy Innovation', 'dummy',
      InnovationTag.SCULPURE_CONSEQUENCE, [InnovationTag.FAITH], true));
    NavParamsMock.setParams(settlement);
    fixture = TestBed.createComponent(SettlementPageComponent);
    settlementPageComponent = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
    settlementPageComponent = null;
  });

  it('created', () => {
    expect(fixture).toBeTruthy();
    expect(settlementPageComponent).toBeTruthy();
  });

  it('ngDoCheck with change', () => {
    spyOn(settlementPageComponent.differ, 'diff').and.returnValue({_records: {size: 2}});
    const spy = spyOn(settlementPageComponent.innovations, 'next');
    settlementPageComponent.ngDoCheck();
    expect(spy).toHaveBeenCalled();
  });

  it('ngDoCheck without change', () => {
    spyOn(settlementPageComponent.differ, 'diff').and.returnValue(false);
    const spy = spyOn(settlementPageComponent.innovations, 'next');
    settlementPageComponent.ngDoCheck();
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('show timeline', () => {
    const spy = spyOn(settlementPageComponent.navCtrl, 'push').and.callThrough();
    settlementPageComponent.showTimeline();
    expect(spy).toHaveBeenCalledWith(TimelinePageComponent, {
      settlementTimeline: settlementPageComponent.settlement.timeline,
    });
  });

  it('show defeated monsters', () => {
    const spy = spyOn(settlementPageComponent.navCtrl, 'push').and.callThrough();
    settlementPageComponent.showDefeatedMonsters();
    expect(spy).toHaveBeenCalledWith(DefeatedMonsterPageComponent, {
      settlement: settlementPageComponent.settlement,
    });
  });

  it('show innovations', () => {
    const spy = spyOn(settlementPageComponent.navCtrl, 'push').and.callThrough();
    settlementPageComponent.showInnovations();
    expect(spy).toHaveBeenCalledWith(ShowListComponent, {
      objects: settlementPageComponent.settlement.innovations,
      type: ShowListTypes.INNOVATION,
      settlement: settlementPageComponent.settlement,
    });
  });

  it('show principles', () => {
    const spy = spyOn(settlementPageComponent.navCtrl, 'push').and.callThrough();
    settlementPageComponent.showPrinciples();
    expect(spy).toHaveBeenCalledWith(PrinciplesPageComponent, {
      settlement: settlementPageComponent.settlement,
    });
  });

  it('show settlement locations', () => {
    const spy = spyOn(settlementPageComponent.navCtrl, 'push').and.callThrough();
    settlementPageComponent.showSettlementLocations();
    expect(spy).toHaveBeenCalledWith(ShowListComponent, {
      objects: settlementPageComponent.settlement.locations,
      type: ShowListTypes.LOCATION,
      settlement: settlementPageComponent.settlement,
    });
  });

  it('show storage', () => {
    const spy = spyOn(settlementPageComponent.navCtrl, 'push').and.callThrough();
    settlementPageComponent.showStorage();
    expect(spy).toHaveBeenCalledWith(StoragePageComponent, {
      settlement: settlementPageComponent.settlement,
    });
  });

  it('change survival limit', () => {
    settlementPageComponent.settlement.survivalLimit = 2;
    settlementPageComponent.survivalLimitChange('not a number');
    expect(settlementPageComponent.settlement.survivalLimit).toBe(2);
    settlementPageComponent.survivalLimitChange(3);
    expect(settlementPageComponent.settlement.survivalLimit).toBe(3);
  });

  it('change settlement lost', () => {
    settlementPageComponent.settlement.settlementLost = 2;
    settlementPageComponent.settlementLostChange('not a number');
    expect(settlementPageComponent.settlement.settlementLost).toBe(2);
    settlementPageComponent.settlementLostChange(3);
    expect(settlementPageComponent.settlement.settlementLost).toBe(3);
  });

  it('change deathcount', () => {
    settlementPageComponent.settlement.deathcount = 2;
    settlementPageComponent.deathcountChange('not a number');
    expect(settlementPageComponent.settlement.deathcount).toBe(2);
    settlementPageComponent.deathcountChange(3);
    expect(settlementPageComponent.settlement.deathcount).toBe(3);
  });

  it('change population', () => {
    settlementPageComponent.settlement.population = 2;
    settlementPageComponent.populationChange('not a number');
    expect(settlementPageComponent.settlement.population).toBe(2);
    settlementPageComponent.populationChange(3);
    expect(settlementPageComponent.settlement.population).toBe(3);
    expect(settlementPageComponent.settlement.survivors.length).toBe(3);
    settlementPageComponent.populationChange(3);
    expect(settlementPageComponent.settlement.population).toBe(3);
    expect(settlementPageComponent.settlement.survivors.length).toBe(3);
    settlementPageComponent.populationChange(2);
    expect(settlementPageComponent.settlement.population).toBe(2);
    expect(settlementPageComponent.settlement.survivors.length).toBe(3);
  });

  it('event reached', () => {
    const spy = spyOn(settlementPageComponent.modalCtrl, 'create').and.returnValue(new ModalMock());
    const lanternEvent = new LanternEvent();
    const settlementLanternEvent = new SettlementLanternEvent(settlement, lanternEvent);
    settlementLanternEvent.reached = true;
    const event = new Event('click');
    settlementPageComponent.eventReached(event, settlementLanternEvent);
    expect(spy).toHaveBeenCalledWith(TimelineEventModalComponent, {
      lanternEvent: lanternEvent,
    });
  });

  it('event not reached', () => {
    const spy = spyOn(settlementPageComponent.modalCtrl, 'create').and.returnValue(new ModalMock());
    const lanternEvent = new LanternEvent();
    const settlementLanternEvent = new SettlementLanternEvent(settlement, lanternEvent);
    settlementLanternEvent.reached = false;
    const event = new Event('click');
    settlementPageComponent.eventReached(event, settlementLanternEvent);
    expect(spy).toHaveBeenCalledTimes(0);
  });

});

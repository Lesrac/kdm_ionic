import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OthersPage } from './others.component';
import {
  App, Config, DeepLinker, DomController, Form, GestureController, IonicModule, Keyboard, NavController,
  NavParams, Platform,
} from '@ionic/angular';
import {
  AppMock, ConfigMock, DeepLinkerMock, NavMock, NavParamsMock,
  PlatformMock,
} from '../../mock/mocks';
import { BrainTraumaPageComponent } from './brain_trauma/brain-trauma.component';
import { GlossaryPageComponent } from './glossary/glossary.component';
import { HuntEventTablePageComponent } from './hunt_event_table/hunt-event-table.component';
import { SevereInjuriesPageComponent } from './severe_injuries/severe-injuries.component';
import { StoryEventsPageComponent } from './story_events/story-events.component';

describe('Others Component', () => {

  let othersPage: OthersPage;
  let fixture: ComponentFixture<OthersPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OthersPage],
      providers: [DomController, Keyboard, Form, GestureController,
        {provide: NavParams, useClass: NavParamsMock},
        {provide: NavController, useClass: NavMock},
        {provide: App, useClass: AppMock},
        {provide: Config, useClass: ConfigMock},
        {provide: DeepLinker, useClass: DeepLinkerMock},
        {provide: Platform, useClass: PlatformMock},
      ],
      imports: [IonicModule],
    });
    fixture = TestBed.createComponent(OthersPage);
    othersPage = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
    othersPage = null;
  });

  it('is created', () => {
    expect(fixture).toBeTruthy();
    expect(othersPage).toBeTruthy();
  });

  it('default: open nothing', () => {
    let spy = spyOn(othersPage.navCtrl, 'push');
    othersPage.goToDetail('dummy');
    expect(spy).toHaveBeenCalledTimes(0);
    othersPage.goToDetail(undefined);
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('open brain trauma page', () => {
    let spy = spyOn(othersPage.navCtrl, 'push').and.callThrough();
    othersPage.goToDetail('braintrauma');
    expect(spy).toHaveBeenCalledWith(BrainTraumaPageComponent, {});
  });

  it('open glossary page', () => {
    let spy = spyOn(othersPage.navCtrl, 'push').and.callThrough();
    othersPage.goToDetail('glossary');
    expect(spy).toHaveBeenCalledWith(GlossaryPageComponent, {});
  });

  it('open hunt event table page', () => {
    let spy = spyOn(othersPage.navCtrl, 'push').and.callThrough();
    othersPage.goToDetail('hunteventtable');
    expect(spy).toHaveBeenCalledWith(HuntEventTablePageComponent, {});
  });

  it('open severe injuries page', () => {
    let spy = spyOn(othersPage.navCtrl, 'push').and.callThrough();
    othersPage.goToDetail('severeinjuries');
    expect(spy).toHaveBeenCalledWith(SevereInjuriesPageComponent, {});
  });

  it('open story events page', () => {
    let spy = spyOn(othersPage.navCtrl, 'push').and.callThrough();
    othersPage.goToDetail('storyevents');
    expect(spy).toHaveBeenCalledWith(StoryEventsPageComponent, {});
  });

});

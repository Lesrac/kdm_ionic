import {
  App,
  Config,
  DeepLinker, DomController, Form, GestureController, Haptic, IonicModule, Keyboard, Modal, ModalController,
  NavController,
  NavParams,
  Platform,
} from 'ionic-angular';
import {
  AppMock, ConfigMock, DeepLinkerMock, KDMDBServiceMock, KDMObserverServiceMock,
  KeyValueDiffersMock, ModalControllerMock, ModalMock,
  NavMock, NavParamsSettlementSurvivorMock, PlatformMock,
} from '../../mock/mocks';
import { KDMObserverService } from '../../service/kdm_observer.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Settlement } from '../../model/settlement';
import { KDMDBService } from '../../service/kdm_db.service';
import { SurvivorPageComponent } from './survivor.component';
import { KeyValueDiffers } from '@angular/core';
import { InputNumberComponent } from '../template/input_number.component';
import { Survivor } from '../../model/survivor';

describe('SurvivorComponent', () => {
  let survivorPageComponent: SurvivorPageComponent;
  let fixture: ComponentFixture<SurvivorPageComponent>;
  let kdmDBServiceMock: KDMDBServiceMock;
  let settlement: Settlement;
  let survivor: Survivor;

  beforeEach(() => {
    kdmDBServiceMock = new KDMDBServiceMock();
    TestBed.configureTestingModule({
      declarations: [SurvivorPageComponent, InputNumberComponent],
      providers: [DomController, Keyboard, Form, GestureController, Haptic,
        {provide: KeyValueDiffers, useClass: KeyValueDiffersMock},
        {provide: NavParams, useClass: NavParamsSettlementSurvivorMock},
        {provide: NavController, useClass: NavMock},
        {provide: App, useClass: AppMock},
        {provide: Config, useClass: ConfigMock},
        {provide: DeepLinker, useClass: DeepLinkerMock},
        {provide: ModalController, useClass: ModalControllerMock},
        {provide: Modal, useClass: ModalMock},
        {provide: Platform, useClass: PlatformMock},
        {provide: KDMDBService, useValue: kdmDBServiceMock},
        {provide: KDMObserverService, useClass: KDMObserverServiceMock},
      ],
      imports: [IonicModule],
    });
    settlement = new Settlement('Dummy Settlement');
    survivor = new Survivor('Survivor', 1, 1);
    NavParamsSettlementSurvivorMock.setParams(settlement, survivor);
    fixture = TestBed.createComponent(SurvivorPageComponent);
    survivorPageComponent = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
    survivorPageComponent = null;
  });

  it('created', () => {
    expect(fixture).toBeTruthy();
    expect(survivorPageComponent).toBeTruthy();
  });

  it('change survival', () => {
    expect(survivor.survival).toBe(0);
    survivorPageComponent.survivalChange(0);
    expect(survivor.survival).toBe(0);
    survivorPageComponent.survivalChange(1);
    expect(survivor.survival).toBe(1);
    survivorPageComponent.survivalChange(7);
    expect(survivor.survival).toBe(7);
    survivorPageComponent.survivalChange(2);
    expect(survivor.survival).toBe(2);
    survivorPageComponent.survivalChange('nan');
    expect(survivor.survival).toBe(2);
  });

  it('change movement', () => {
    expect(survivor.movement).toBe(5);
    survivorPageComponent.movementChange(5);
    expect(survivor.movement).toBe(5);
    survivorPageComponent.movementChange(1);
    expect(survivor.movement).toBe(1);
    survivorPageComponent.movementChange(7);
    expect(survivor.movement).toBe(7);
    survivorPageComponent.movementChange(2);
    expect(survivor.movement).toBe(2);
    survivorPageComponent.movementChange('nan');
    expect(survivor.movement).toBe(2);
  });

  it('change accuracy', () => {
    expect(survivor.accuracy).toBe(0);
    survivorPageComponent.accuracyChange(0);
    expect(survivor.accuracy).toBe(0);
    survivorPageComponent.accuracyChange(1);
    expect(survivor.accuracy).toBe(1);
    survivorPageComponent.accuracyChange(7);
    expect(survivor.accuracy).toBe(7);
    survivorPageComponent.accuracyChange(2);
    expect(survivor.accuracy).toBe(2);
    survivorPageComponent.accuracyChange('nan');
    expect(survivor.accuracy).toBe(2);
  });

  it('change strength', () => {
    expect(survivor.strength).toBe(0);
    survivorPageComponent.strengthChange(0);
    expect(survivor.strength).toBe(0);
    survivorPageComponent.strengthChange(1);
    expect(survivor.strength).toBe(1);
    survivorPageComponent.strengthChange(7);
    expect(survivor.strength).toBe(7);
    survivorPageComponent.strengthChange(2);
    expect(survivor.strength).toBe(2);
    survivorPageComponent.strengthChange('nan');
    expect(survivor.strength).toBe(2);
  });

  it('change evasion', () => {
    expect(survivor.evasion).toBe(0);
    survivorPageComponent.evasionChange(0);
    expect(survivor.evasion).toBe(0);
    survivorPageComponent.evasionChange(1);
    expect(survivor.evasion).toBe(1);
    survivorPageComponent.evasionChange(7);
    expect(survivor.evasion).toBe(7);
    survivorPageComponent.evasionChange(2);
    expect(survivor.evasion).toBe(2);
    survivorPageComponent.evasionChange('nan');
    expect(survivor.evasion).toBe(2);
  });

  it('change luck', () => {
    expect(survivor.luck).toBe(0);
    survivorPageComponent.luckChange(0);
    expect(survivor.luck).toBe(0);
    survivorPageComponent.luckChange(1);
    expect(survivor.luck).toBe(1);
    survivorPageComponent.luckChange(7);
    expect(survivor.luck).toBe(7);
    survivorPageComponent.luckChange(2);
    expect(survivor.luck).toBe(2);
    survivorPageComponent.luckChange('nan');
    expect(survivor.luck).toBe(2);
  });

  it('change speed', () => {
    expect(survivor.speed).toBe(0);
    survivorPageComponent.speedChange(0);
    expect(survivor.speed).toBe(0);
    survivorPageComponent.speedChange(1);
    expect(survivor.speed).toBe(1);
    survivorPageComponent.speedChange(7);
    expect(survivor.speed).toBe(7);
    survivorPageComponent.speedChange(2);
    expect(survivor.speed).toBe(2);
    survivorPageComponent.speedChange('nan');
    expect(survivor.speed).toBe(2);
  });

  it('change insanity', () => {
    expect(survivor.insanity).toBe(0);
    survivorPageComponent.insanityChange(0);
    expect(survivor.insanity).toBe(0);
    survivorPageComponent.insanityChange(1);
    expect(survivor.insanity).toBe(1);
    survivorPageComponent.insanityChange(7);
    expect(survivor.insanity).toBe(7);
    survivorPageComponent.insanityChange(2);
    expect(survivor.insanity).toBe(2);
    survivorPageComponent.insanityChange('nan');
    expect(survivor.insanity).toBe(2);
  });

  it('change head armor', () => {
    expect(survivor.headArmor).toBe(0);
    survivorPageComponent.headArmorChange(0);
    expect(survivor.headArmor).toBe(0);
    survivorPageComponent.headArmorChange(1);
    expect(survivor.headArmor).toBe(1);
    survivorPageComponent.headArmorChange(7);
    expect(survivor.headArmor).toBe(7);
    survivorPageComponent.headArmorChange(2);
    expect(survivor.headArmor).toBe(2);
    survivorPageComponent.headArmorChange('nan');
    expect(survivor.headArmor).toBe(2);
  });

  it('change arms armor', () => {
    expect(survivor.armsArmor).toBe(0);
    survivorPageComponent.armsArmorChange(0);
    expect(survivor.armsArmor).toBe(0);
    survivorPageComponent.armsArmorChange(1);
    expect(survivor.armsArmor).toBe(1);
    survivorPageComponent.armsArmorChange(7);
    expect(survivor.armsArmor).toBe(7);
    survivorPageComponent.armsArmorChange(2);
    expect(survivor.armsArmor).toBe(2);
    survivorPageComponent.armsArmorChange('nan');
    expect(survivor.armsArmor).toBe(2);
  });

  it('change body armor', () => {
    expect(survivor.bodyArmor).toBe(0);
    survivorPageComponent.bodyArmorChange(0);
    expect(survivor.bodyArmor).toBe(0);
    survivorPageComponent.bodyArmorChange(1);
    expect(survivor.bodyArmor).toBe(1);
    survivorPageComponent.bodyArmorChange(7);
    expect(survivor.bodyArmor).toBe(7);
    survivorPageComponent.bodyArmorChange(2);
    expect(survivor.bodyArmor).toBe(2);
    survivorPageComponent.bodyArmorChange('nan');
    expect(survivor.bodyArmor).toBe(2);
  });

  it('change waist armor', () => {
    expect(survivor.waistArmor).toBe(0);
    survivorPageComponent.waistArmorChange(0);
    expect(survivor.waistArmor).toBe(0);
    survivorPageComponent.waistArmorChange(1);
    expect(survivor.waistArmor).toBe(1);
    survivorPageComponent.waistArmorChange(7);
    expect(survivor.waistArmor).toBe(7);
    survivorPageComponent.waistArmorChange(2);
    expect(survivor.waistArmor).toBe(2);
    survivorPageComponent.waistArmorChange('nan');
    expect(survivor.waistArmor).toBe(2);
  });

  it('change legs armor', () => {
    expect(survivor.legsArmor).toBe(0);
    survivorPageComponent.legsArmorChange(0);
    expect(survivor.legsArmor).toBe(0);
    survivorPageComponent.legsArmorChange(1);
    expect(survivor.legsArmor).toBe(1);
    survivorPageComponent.legsArmorChange(7);
    expect(survivor.legsArmor).toBe(7);
    survivorPageComponent.legsArmorChange(2);
    expect(survivor.legsArmor).toBe(2);
    survivorPageComponent.legsArmorChange('nan');
    expect(survivor.legsArmor).toBe(2);
  });

  it('change understanding', () => {
    expect(survivor.understanding).toBe(0);
    survivorPageComponent.understandingChange(0);
    expect(survivor.understanding).toBe(0);
    survivorPageComponent.understandingChange(1);
    expect(survivor.understanding).toBe(1);
    survivorPageComponent.understandingChange(7);
    expect(survivor.understanding).toBe(7);
    survivorPageComponent.understandingChange(2);
    expect(survivor.understanding).toBe(2);
    survivorPageComponent.understandingChange('nan');
    expect(survivor.understanding).toBe(2);
  });

  it('change courage', () => {
    expect(survivor.courage).toBe(0);
    survivorPageComponent.courageChange(0);
    expect(survivor.courage).toBe(0);
    survivorPageComponent.courageChange(1);
    expect(survivor.courage).toBe(1);
    survivorPageComponent.courageChange(7);
    expect(survivor.courage).toBe(7);
    survivorPageComponent.courageChange(2);
    expect(survivor.courage).toBe(2);
    survivorPageComponent.courageChange('nan');
    expect(survivor.courage).toBe(2);
  });

  it('change weapon proficiency xp', () => {
    expect(survivor.weaponProficiencyXP).toBe(0);
    survivorPageComponent.weaponProficiencyXPChange(0);
    expect(survivor.weaponProficiencyXP).toBe(0);
    survivorPageComponent.weaponProficiencyXPChange(1);
    expect(survivor.weaponProficiencyXP).toBe(1);
    survivorPageComponent.weaponProficiencyXPChange(7);
    expect(survivor.weaponProficiencyXP).toBe(7);
    survivorPageComponent.weaponProficiencyXPChange(2);
    expect(survivor.weaponProficiencyXP).toBe(2);
    survivorPageComponent.weaponProficiencyXPChange('nan');
    expect(survivor.weaponProficiencyXP).toBe(2);
  });

});

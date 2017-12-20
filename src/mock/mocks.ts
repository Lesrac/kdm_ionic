import { SettlementSimplified } from '../model/db/settlement_simplified';
import { Settlement } from '../model/settlement';
import { mockApp, mockConfig, mockDeepLinker } from 'ionic-angular/util/mock-providers';
import { ModalController } from 'ionic-angular';

export class NavMock {

  public pop(): any {
    return new Promise(function (resolve: Function): void {
      resolve();
    });
  }

  public push(): any {
    return new Promise(function (resolve: Function): void {
      resolve();
    });
  }

  public getActive(): any {
    return {
      'instance': {
        'model': 'something',
      },
    };
  }

  public setRoot(): any {
    return true;
  }

  public popToRoot(): any {
    return true;
  }
}

export class AppMock {
  public getActiveNav(): NavMock {
    return new NavMock();
  }
}

export class NavParamsMock {
  static returnParam = null;

  static setParams(value) {
    NavParamsMock.returnParam = value;
  }

  public get(key): any {
    if (NavParamsMock.returnParam) {
      return NavParamsMock.returnParam;
    }
    return 'default';
  }
}

export class ConfigMock {

  public get(): any {
    return '';
  }

  public getBoolean(): boolean {
    return true;
  }

  public getNumber(): number {
    return 1;
  }

  public setTransition(): void {
    return;
  }
}

export class DeepLinkerMock {

}

export class PlatformMock {
  public ready(): Promise<{ String }> {
    return Promise.resolve({String: 'READY'});
  }

  public registerBackButtonAction(fn: Function, priority?: number): Function {
    return (() => true);
  }

  public hasFocus(ele: HTMLElement): boolean {
    return true;
  }

  public doc(): HTMLDocument {
    return document;
  }

  public is(): boolean {
    return false;
  }

  public getElementComputedStyle(container: any): any {
    return {
      paddingLeft: '10',
      paddingTop: '10',
      paddingRight: '10',
      paddingBottom: '10',
    };
  }

  public onResize(callback: any) {
    return callback;
  }

  public registerListener(ele: any, eventName: string, callback: any): Function {
    return (() => true);
  }

  public win(): Window {
    return window;
  }

  public raf(callback: any): number {
    return 1;
  }

  public timeout(callback: any, timer: number): any {
    return setTimeout(callback, timer);
  }

  public cancelTimeout(id: any) {
    // do nothing
  }

  public getActiveElement(): any {
    return document['activeElement'];
  }
}

export class ModalControllerMock {
  constructor() {
    return new ModalController(mockApp(), mockConfig(), mockDeepLinker());
  }
}

export class ModalMock {

  public present(): any {
    return new Promise(function (resolve: Function): void {
      resolve();
    });
  }
}

export class KDMDBServiceMock {
  private settlements: string = 'settlements';
  private settlement: string = 'settlement';

  getSettlements(): Promise<[SettlementSimplified[], void]> {
    const settlements: SettlementSimplified[] = [];
    let x: void;
    return Promise.all<SettlementSimplified[], void>([settlements, x]);
  }

  getSettlementById(id: number): Promise<SettlementSimplified> {
    return Promise.resolve(new SettlementSimplified(id, 'Dummy simplified settlement', 1, 1, 0, 0));
  }

  saveSettlements(settlements: Settlement[]): void {
    settlements.forEach(settlement => this.saveSettlement(settlement));
  }

  saveSettlement(settlement: Settlement): void {
  }

  removeSettlement(settlementId: number): void {
  }

}

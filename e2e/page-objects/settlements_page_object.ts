import { $, browser, by, element, ElementFinder, ExpectedConditions } from 'protractor';
import { ElementArrayFinder } from 'protractor/built/element';
import { CreateSettlementModalObject } from './create_settlement_modal_object';

const createSettlementModalObject = new CreateSettlementModalObject();

export class SettlementsPageObject {
  public readonly addButton: ElementFinder = element.all(by.className('button-add')).first();
  public readonly settlementsList: ElementArrayFinder = element.all(by.className('container'));
  public readonly settlementsListFirstElement: ElementFinder = element.all(by.className('container')).first();

  public loadPage(): void {
    browser.get('');
    browser.wait(ExpectedConditions.stalenessOf($('.loading-wrapper')), 20000);
  }

  public clickAddSettlementButton(): void {
    this.addButton.click();
    this.waitCreateModalLoaded();
    createSettlementModalObject.createSettlement();
    this.waitCreateModalLoaded();
  }

  private waitCreateModalLoaded(): void {
    this.waitIonViewDidLoad();
    this.waitIonViewDidEnter();
  }

  private waitIonViewDidLoad(): void {
    browser.sleep(1000);
    browser.wait(ExpectedConditions.stalenessOf($('.loading-wrapper')), 20000);
  }

  private waitIonViewDidEnter(): void {
    browser.sleep(1000);
    browser.wait(ExpectedConditions.stalenessOf($('.loading-wrapper')), 20000);
  }

}

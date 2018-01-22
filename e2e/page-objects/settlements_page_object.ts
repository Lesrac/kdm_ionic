import { $, browser, by, element, ElementFinder, ExpectedConditions } from 'protractor';
import { ElementArrayFinder } from 'protractor/built/element';

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
  }

}

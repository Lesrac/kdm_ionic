import { by, element, ElementFinder } from 'protractor';

export class CreateSettlementModalObject {
  public readonly addButton: ElementFinder = element.all(by.id('button-add')).first();

  public createSettlement(): void {
    this.addButton.click();
  }

}

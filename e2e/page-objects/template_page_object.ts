import { by, element, ElementFinder } from 'protractor';

export class TemplatePageObject {
  public readonly addObjectButton: ElementFinder = element(by.id('add_object_button'));

  public openAddView(): void {
    this.addObjectButton.click();
  }

}

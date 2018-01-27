import { $, browser, by, element, ElementFinder, ExpectedConditions } from 'protractor';

export class StoragePageObject {
  public readonly addStorageButton: ElementFinder = element(by.id('add_storage_button'));
  public readonly itemList: ElementFinder = element(by.id('storage_items_list'));
  public readonly storageChooser: ElementFinder = element(by.id('storage_item_chooser'));
  public readonly addAndCloseButton: ElementFinder = element(by.id('add_and_close_button'));
  public readonly alertRadioGroup: ElementFinder = element(by.className('alert-radio-group'));
  public readonly alertButtonGroup: ElementFinder = element(by.className('alert-button-group'));

  public openAddView(): void {
    this.addStorageButton.click();
    this.waitStoragePageLoaded();
  }

  public selectStorageElementToAdd(): string {
    let storageItemName: string = '';
    this.storageChooser.click();
    this.waitStoragePageLoaded();
    this.alertRadioGroup.all(by.className('alert-tappable')).first().click();
    this.alertButtonGroup.all(by.className('alert-button')).last().click();
    this.waitStoragePageLoaded();
    this.storageChooser.element(by.className('select')).getAttribute('ng-reflect-model')
      .then(text => storageItemName = text);
    this.addAndCloseButton.click();
    this.waitStoragePageLoaded();
    return storageItemName;
  }

  private waitStoragePageLoaded(): void {
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

import { $, browser, by, element, ElementFinder, ExpectedConditions } from 'protractor';
import { SettlementsPageObject } from './settlements_page_object';

const settlementsPage = new SettlementsPageObject();

export class SettlementPageObject {

  public readonly timelineButton: ElementFinder = element(by.id('button_show_timeline'));
  public readonly innovationsButton: ElementFinder = element(by.id('button_show_innovations'));
  public readonly principlesButton: ElementFinder = element(by.id('button_show_principles'));
  public readonly settlementLocationsButton: ElementFinder = element(by.id('button_show_settlement_locations'));
  public readonly storageButton: ElementFinder = element(by.id('button_show_storage'));
  public readonly defeatedMonstersButton: ElementFinder = element(by.id('button_show_defeated_monsters'));
  public readonly survivalLimitNumberInput: ElementFinder = element(by.id('survivalLimit'));
  public readonly deathcountNumberInput: ElementFinder = element(by.id('deathcount'));
  public readonly populationNumberInput: ElementFinder = element(by.id('population'));
  public readonly settlementLostNumberInput: ElementFinder = element(by.id('settlementLost'));
  public readonly milestonesGroup: ElementFinder = element(by.id('milestones_group'));
  public readonly quarriesGroup: ElementFinder = element(by.id('quarries_group'));
  public readonly nemesisMonstersGroup: ElementFinder = element(by.id('nemesis_monsters_group'));

  public openSettlement(): void {
    settlementsPage.clickAddSettlementButton();
    this.waitSettlementPageLoaded();
    settlementsPage.settlementsListFirstElement.click();
    this.waitSettlementPageLoaded();
  }

  public openButtonElement(button: ElementFinder): void {
    button.click();
    this.waitSettlementPageLoaded();
  }

  private waitSettlementPageLoaded(): void {
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

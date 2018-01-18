import { $, browser, by, element, ElementFinder, ExpectedConditions } from 'protractor';
import { SettlementsPageObject } from './page-objects/SettlementsPageObject';
import { SettlementPageObject } from './page-objects/SettlementPageObject';

const settlementsPage = new SettlementsPageObject();
const settlementPage = new SettlementPageObject();
describe('testing settlement view', () => {

  let originalTimeout;

  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  });

  beforeEach(() => {
    settlementsPage.loadPage();
  });

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
    browser.executeScript('window.indexedDB.deleteDatabase("_ionicstorage");');
  });

  it('open settlement and check default elements', () => {
    settlementPage.openSettlement();
    expect(settlementPage.defeatedMonstersButton.isPresent()).toBeTruthy('Defeated Monsters Button is not available');
    expect(settlementPage.innovationsButton.isPresent()).toBeTruthy('Innovations Button is not available');
    expect(settlementPage.timelineButton.isPresent()).toBeTruthy('Timeline Button is not available');
    expect(settlementPage.principlesButton.isPresent()).toBeTruthy('Principles Button is not available');
    expect(settlementPage.storageButton.isPresent()).toBeTruthy('Storage Button is not available');
    expect(settlementPage.settlementLocationsButton.isPresent())
      .toBeTruthy('Settlement Locations Button is not available');
    expect(settlementPage.deathcountNumberInput.isPresent()).toBeTruthy('Deathcount Number Input is not available');
    expect(settlementPage.deathcountNumberInput.element(by.className('input')).getAttribute('ng-reflect-model'))
      .toEqual('0', 'Death Count is not 0');
    expect(settlementPage.survivalLimitNumberInput.isPresent())
      .toBeTruthy('Survival Limit Number Input is not available');
    expect(settlementPage.survivalLimitNumberInput.element(by.className('input')).getAttribute('ng-reflect-model'))
      .toEqual('0', 'Survival Limit is not 0');
    expect(settlementPage.populationNumberInput.isPresent()).toBeTruthy('Population Number Input is not available');
    expect(settlementPage.populationNumberInput.element(by.className('input')).getAttribute('ng-reflect-model'))
      .toEqual('0', 'Population is not 0');
    expect(settlementPage.settlementLostNumberInput.isPresent())
      .toBeTruthy('Settlement Lost Number Input is not available');
    expect(settlementPage.settlementLostNumberInput.element(by.className('input')).getAttribute('ng-reflect-model'))
      .toEqual('0', 'Settlement Lost not 0');

    expect(settlementPage.milestonesGroup.isPresent()).toBeTruthy('Milestone group not available');

    settlementPage.milestonesGroup.all(by.className('item item-block'))
      .then((milestones: ElementFinder[]) => {
        expect(milestones.length).toBe(5, 'There are not 5 Settlement Milestones');
        milestones.forEach((milestone: ElementFinder) => {
          expect(milestone.element(by.className('checkbox')).getAttribute('ng-reflect-model'))
            .toEqual('false', 'Milestone shouldn\'t be reached');
        });
      });
  });

});

import { browser, by, ElementFinder } from 'protractor';
import { SettlementsPageObject } from './page-objects/settlements_page_object';
import { SettlementPageObject } from './page-objects/settlement_page_object';
import { TemplatePageObject } from './page-objects/template_page_object';
import { StoragePageObject } from './page-objects/storage_page_object';

const settlementsPage = new SettlementsPageObject();
const settlementPage = new SettlementPageObject();
const storagePage = new StoragePageObject();
const templatePage = new TemplatePageObject();
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
    expect<any>(settlementPage.deathcountNumberInput.element(by.className('input')).getAttribute('ng-reflect-model'))
      .toEqual('0', 'Death Count is not 0');
    expect(settlementPage.survivalLimitNumberInput.isPresent())
      .toBeTruthy('Survival Limit Number Input is not available');
    expect<any>(settlementPage.survivalLimitNumberInput.element(by.className('input')).getAttribute('ng-reflect-model'))
      .toEqual('0', 'Survival Limit is not 0');
    expect(settlementPage.populationNumberInput.isPresent()).toBeTruthy('Population Number Input is not available');
    expect<any>(settlementPage.populationNumberInput.element(by.className('input')).getAttribute('ng-reflect-model'))
      .toEqual('0', 'Population is not 0');
    expect(settlementPage.settlementLostNumberInput.isPresent())
      .toBeTruthy('Settlement Lost Number Input is not available');
    expect<any>(settlementPage.settlementLostNumberInput.element(by.className('input'))
      .getAttribute('ng-reflect-model')).toEqual('0', 'Settlement Lost not 0');

    expect(settlementPage.milestonesGroup.isPresent()).toBeTruthy('Milestone group not available');
    settlementPage.milestonesGroup.all(by.className('item item-block'))
      .then((milestones: ElementFinder[]) => {
        expect(milestones.length).toBe(5, 'There are not 5 Settlement Milestones');
        milestones.forEach((milestone: ElementFinder) => {
          expect<any>(milestone.element(by.className('checkbox')).getAttribute('ng-reflect-model'))
            .toEqual('false', 'Milestone shouldn\'t be reached');
        });
      });

    expect(settlementPage.quarriesGroup.isPresent()).toBeTruthy('Quarries group not available');
    settlementPage.quarriesGroup.all(by.className('item item-block')).then((quarries: ElementFinder[]) => {
      expect(quarries.length).toBe(3, 'Amount of Quarries not correct');
      quarries.forEach((quarry: ElementFinder) => {
        quarry.element(by.className('label')).getText().then(text => {
          if (text.includes('White Lion')) {
            expect<any>(quarry.element(by.className('checkbox')).getAttribute('ng-reflect-model'))
              .toEqual('true', 'White Lion is not huntable');
          } else {
            expect<any>(quarry.element(by.className('checkbox')).getAttribute('ng-reflect-model'))
              .toEqual('false', text + ' is huntable');
          }
        });
      });
    });

    expect(settlementPage.nemesisMonstersGroup.isPresent()).toBeTruthy('Nemesis monster group not available');
    settlementPage.nemesisMonstersGroup.all(by.className('row')).then(nemesisMonsters => {
      expect(nemesisMonsters.length).toBe(5, 'Amount of Nemesis Monsters not correct');
    });
  });

  xit('checking storage adding', () => {
    settlementPage.openSettlement();
    settlementPage.openButtonElement(settlementPage.storageButton);
    expect(storagePage.addStorageButton.isPresent()).toBeTruthy('add button not available');
    expect<any>(storagePage.itemList.all(by.className('segment')).count())
      .toBe(0, 'There are elements in the storage list');
    storagePage.openAddView();
    expect(storagePage.storageChooser.isPresent()).toBeTruthy('Storage chooser not available');
    const textOfAddedStorageItem = storagePage.selectStorageElementToAdd();
    storagePage.itemList.all(by.className('segment')).then((storageItemSegments: ElementFinder[]) => {
      expect(storageItemSegments.length).toBe(1, 'Storage Element was not added to the list');
      storageItemSegments[0].element(by.className('label')).getText()
        .then(text => expect(text).toEqual(textOfAddedStorageItem));
    });
  });

});

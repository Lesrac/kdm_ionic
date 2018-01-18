import { element, by, browser } from 'protractor';
import { SettlementsPageObject } from './page-objects/SettlementsPageObject';

const settlementsPage = new SettlementsPageObject();
describe('testing settlements view', () => {

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

  it('the settlements page is displayed by default', () => {
    expect(element(by.className('content')).getAttribute('innerHTML')).toContain('Available Settlements');
    expect(settlementsPage.addButton.isPresent()).toBeTruthy();
  });

  it('click add settlement button', () => {
    expect(settlementsPage.settlementsListFirstElement.isPresent()).toBeFalsy();
    expect(settlementsPage.settlementsList.count()).toEqual(0);
    settlementsPage.clickAddSettlementButton();
    expect(settlementsPage.settlementsListFirstElement.isPresent()).toBeTruthy();
    expect(settlementsPage.settlementsList.count()).toEqual(1);
    settlementsPage.clickAddSettlementButton();
    settlementsPage.clickAddSettlementButton();
    expect(settlementsPage.settlementsList.count()).toEqual(3);
  });

});

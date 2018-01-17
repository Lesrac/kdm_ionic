import { element, by } from 'protractor';
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
  });

  it('the settlements page is displayed by default', () => {
    expect(element(by.className('content')).getAttribute('innerHTML')).toContain('Available Settlements');
    expect(settlementsPage.addButton.isPresent()).toEqual(true);
  });

  it('click add settlement button', () => {
    expect(settlementsPage.settlementsListFirstElement.isPresent()).toEqual(false);
    expect(settlementsPage.settlementsList.count()).toEqual(0);
    settlementsPage.clickAddSettlementButton();
    expect(settlementsPage.settlementsListFirstElement.isPresent()).toEqual(true);
    expect(settlementsPage.settlementsList.count()).toEqual(1);
    settlementsPage.clickAddSettlementButton();
    settlementsPage.clickAddSettlementButton();
    expect(settlementsPage.settlementsList.count()).toEqual(3);
  });

});

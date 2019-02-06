import { TypeaheadPo } from '../support/typeahead.po';

describe('Typeahead demo page test suite', () => {
  const typeahead = new TypeaheadPo();

  beforeEach(() => typeahead.navigateTo());

  describe('Basic array', () => {
    const basicDemo = typeahead.exampleDemosArr.basic;
    const noMatchText = 'qwerty';
    const stateForCheck = 'Alabama';

    it('User scrolls to Basic array sub-menu and sees typeahead input and typeahead card with "Model:" text', () => {
      typeahead.scrollToMenu('Basic array');
      typeahead.isElementVisible(basicDemo, typeahead.cardHeader);
      typeahead.isPreviewExist(basicDemo, 'Model: ');
      typeahead.isElementVisible(basicDemo, typeahead.inputSelector);
    });

    it('the dropdown does not shown if there are no matches', () => {
      typeahead.clearInputAndSendKeys(basicDemo, noMatchText);
      typeahead.isDropdownEnabled(typeahead.activeDropdown, 'not.be.enabled');
      typeahead.isDemoContainsTxt(basicDemo, noMatchText);
    });

    it('the dropdown with matches is shown. click on an item auto-fills typeahead container', () => {
      typeahead.clearInputAndSendKeys(basicDemo, stateForCheck);
      typeahead.isDropdownEnabled(typeahead.activeDropdown, 'be.visible');
      typeahead.clickOnDropdownItem(typeahead.activeDropdown, stateForCheck);
      typeahead.isDemoContainsTxt(basicDemo, stateForCheck);
    });
  });
});

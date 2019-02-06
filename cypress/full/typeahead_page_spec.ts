import { TypeaheadPo } from '../support/typeahead.po';

describe('Typeahead demo page test suite', () => {
  const typeahead = new TypeaheadPo();

  beforeEach(() => typeahead.navigateTo());

  describe('Item template', () => {
    const itemTemp = typeahead.exampleDemosArr.itemTemplate;
    const stateForCheck = 'Colorado';
    const checkTemplate = 'This is: "Colorado" Index: 0';

    it('check the dropdown list contains the template "This is: [matched state] Index: [index #]', () => {
      typeahead.scrollToMenu('Item template');
      typeahead.clearInputAndSendKeys(itemTemp, stateForCheck);
      typeahead.isElemTextCorrect(itemTemp, typeahead.activeDropdown, checkTemplate, 0);
      typeahead.clickOnDropdownItem(typeahead.activeDropdown, stateForCheck);
      typeahead.isDemoContainsTxt(itemTemp, stateForCheck);
    });
  });

  describe('Option field', () => {
    const optFiled = typeahead.exampleDemosArr.optionField;
    const stateForCheck = 'New York';

    it('dropdown with matches from the array is shown. click on an item auto-fills typeahead container', () => {
      typeahead.scrollToMenu('Option field');
      typeahead.clearInputAndSendKeys(optFiled, stateForCheck);
      typeahead.isDropdownEnabled(typeahead.activeDropdown, 'be.visible');
      typeahead.clickOnDropdownItem(typeahead.activeDropdown, stateForCheck);
      typeahead.isDemoContainsTxt(optFiled, stateForCheck);
    });
  });

  describe('Async data', () => {
    const asyncData = typeahead.exampleDemosArr.asyncData;
    const stateForCheck = 'Alaska';
    const placeholderText = 'Locations loaded with timeout';

    it('typeahead input contains a placeholder "Locations loaded with timeout"', () => {
      typeahead.scrollToMenu('Async data');
      typeahead.isInputHasCorrectPlaceholder(asyncData, typeahead.inputSelector, placeholderText);
    });

    it('dropdown with matches is shown. only 7 matches are shown', () => {
      typeahead.clearInputAndSendKeys(asyncData, 'a');
      typeahead.isDropdownEnabled(typeahead.activeDropdown, 'be.visible');
      cy.get(typeahead.dropdownItem).should('have.length', 7);
      typeahead.clickOnDropdownItem(typeahead.activeDropdown, stateForCheck);
      typeahead.isDemoContainsTxt(asyncData, stateForCheck);
    });
  });

  describe('With delay', () => {
    const withDelay = typeahead.exampleDemosArr.withDelay;
    const stateForCheck = 'Oklahoma';
    const timeDelay = 1000;

    it('the dropdown is shown with delay to 1000ms', () => {
      typeahead.scrollToMenu('With delay');
      cy.clock();
      typeahead.clearInputAndSendKeys(withDelay, stateForCheck);
      cy.tick(timeDelay);
      typeahead.isDropdownEnabled(typeahead.activeDropdown, 'be.visible');
      // needs investigation dropdown doesn't displayed correctly
      // typeahead.clickOnDropdownItem(typeahead.activeDropdown, stateForCheck);
      typeahead.isDemoContainsTxt(withDelay, stateForCheck);
    });
  });

  describe('Template-driven forms', () => {
    const tempDriven = typeahead.exampleDemosArr.templateDriven;
    const stateForCheck = 'California';
    const formTemplate = 'Model: {\n  "address": "312 Sundown Lane",\n  "state": null\n}';
    const inputAddress = 'Address';
    const inputState = '';

    it('a user scrolls to Template-driven forms sub-menu and sees the typeahead input and typeahead card', () => {
      typeahead.scrollToMenu('Template-driven forms');
      typeahead.isElementVisible(tempDriven, typeahead.cardHeader);
      typeahead.isPreviewExist(tempDriven, formTemplate);
      typeahead.isElementVisible(tempDriven, typeahead.inputSelector, 0);
      typeahead.isPreviewExist(tempDriven, inputAddress); // recheck all inputs on existence
      typeahead.isElementVisible(tempDriven, typeahead.inputSelector, 1);
      typeahead.isPreviewExist(tempDriven, formTemplate, 1);

    });
  });



  //   const reactiveForm = typeahead.exampleDemosArr.reactiveForms;
  //
  //   it('reactive forms typeahead appears after focus on input', () => {
  //     cy.get(reactiveForm).as('reactiveForm').find(typeahead.tagInput).focus();
  //     cy.get('@reactiveForm')
  //       .should('to.have.descendants', typeahead.containerTypeahead);
  //   });
  // });


 // Configuring defaults
 // typeahead.clickOnDemoMenu('Configuring defaults');

});

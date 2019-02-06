import { BaseComponent } from './base.component';

export class TypeaheadPo extends BaseComponent {
  pageUrl = '/typeahead';
  pageTitle = 'Typeahead';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/typeahead';

  inputSelector = 'input';
  inputControl = '.form-control';
  containerSelector = 'typeahead-container';
  cardHeader = '.card-header';  // field with Model:
  activeDropdown = '.dropdown';
  dropdownItem = '.dropdown button';  // one dropdwn item

  exampleDemosArr = {
    basic: 'demo-typeahead-basic',
    itemTemplate: 'demo-typeahead-item-template',
    optionField: 'demo-typeahead-field',
    asyncData: 'demo-typeahead-async',
    withDelay: 'demo-typeahead-delay',
    templateDriven: 'demo-typeahead-form',
    reactiveForms: 'demo-typeahead-reactive-form',
    groupingResults: 'demo-typeahead-grouping',
    ignoreSpaceAndOrder: 'demo-typeahead-single-world',
    delimiters: 'demo-typeahead-phrase-delimiters',
    dropUp: 'demo-typeahead-dropup',
    onBlur: 'demo-typeahead-on-blur',
    appendToBody: 'demo-typeahead-container',
    noResult: 'demo-typeahead-no-result',
    scrollable: 'demo-typeahead-scrollable',
    latinize: 'demo-typeahead-latinize',
    onSelect: 'demo-typeahead-on-select',
    resultOnBlur: 'demo-typeahead-show-on-blur',
    configuringDefaults: 'demo-typeahead-config'
  };

  isElementVisible(baseSelector: string, elementToFind: string, rowNum?: number) {
    if (!rowNum) {
      cy.get(`${ baseSelector } ${elementToFind}`).should('be.visible');
    } else {
      cy.get(`${ baseSelector } ${elementToFind}`).eq(rowNum).should('be.visible');
    }
  }

  isDropdownEnabled(baseSelector: string, state: string) {
    cy.get(baseSelector)
      .should(state);
  }

  clickOnDropdownItem(dropdownSel: string, clkOnItem: string) {
    cy.get(dropdownSel).contains(clkOnItem)
      .click();
  }

  isInputHasCorrectPlaceholder(baseSelector: string, findInput: string, shdBePlaceholder: string) {
    cy.get(`${baseSelector} ${findInput}`)
      .should('have.attr', 'placeholder', shdBePlaceholder);
  }

  isElemTextCorrect(baseSelector: string, itemSel: string, textToCheck: string, rowNum?: number) {
    cy.get(baseSelector).find(itemSel).eq(rowNum)
      .invoke('text').should('contain', textToCheck);
  }

  isModelCartEmpty() {
    cy.get(this.cardHeader)
      .should('be.empty');
  }

  isCardtHasText(cardAlias: string, textToCheck: string) {
    cy.get(this.cardHeader)
      .should('have.text', textToCheck);
  }
}

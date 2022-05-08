// cypress/integration/entry.spec.js

import { doTimes } from '../util';

const entriesRoute = 'http://localhost:3000/';

const repeat5 = doTimes(5);

const prep = () => {
  // Ensure API has resolved before firing our tests
  beforeEach(() => {
    cy.intercept('/api/titles').as('getTitles');
    cy.visit(entriesRoute);
    cy.wait('@getTitles');
  });
};

describe('Entry Button', () => {
  prep();
  // Ensure the status button renders
  it('should render', () => cy.get('.status-button').should('exist'));

  it('should toggle status when clicked', () => {
    // Repeat the test to ensure toggling is working, not just initial click.
    repeat5(() => {
      cy.get('.status-button').each(($btn) => {
        const initial = $btn.text();
        cy.wrap($btn)
          .click()
          .then((updated) =>
            cy.wrap(updated).should('not.contain.text', initial)
          );
      });
    });
  });
});

describe('Entry Card', () => {
  prep();

  it('should be draggable and droppable', () => {
    const payload = { dataTransfer: new DataTransfer() };

    repeat5(() => {
      // Swap Entry1 and Entry2 (2, 1, 3)
      cy.get('.entry').eq(0).trigger('dragstart', payload);
      cy.get('.entry').eq(1).trigger('drop', payload);

      // Swap Entry2 and Entry3 (3, 1, 2)
      cy.get('.entry').eq(0).trigger('dragstart', payload);
      cy.get('.entry').eq(2).trigger('drop', payload);

      // Swap Entry1 with Entry3 (1, 3, 2)
      cy.get('.entry').eq(1).trigger('dragstart', payload);
      cy.get('.entry').eq(0).trigger('drop', payload);
    });
  });
});

const asModule = {};
export default asModule;

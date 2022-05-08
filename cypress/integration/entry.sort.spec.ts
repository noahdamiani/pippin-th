// cypress/integration/entry.sort.spec.js

const entriesRoute = 'http://localhost:3000/';

const prep = () => {
  // Ensure API has resolved before firing our tests
  beforeEach(() => {
    cy.intercept('/api/titles').as('getTitles');
    cy.visit(entriesRoute);
    cy.wait('@getTitles');
  });
};

describe('Sort Dropdown', () => {
  prep();
  // Ensure the sort dropdown renders
  it('should render', () => cy.get('.entry-sort').should('exist'));
});

const asModule = {};
export default asModule;

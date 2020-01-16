test = it;

describe('ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=inputcomponent--primary'));

  test('Debe ingresar una nueva tarea', () => {
    cy.get('[data-testid=input]').type('Nueva tarea');
    cy.get('[data-testid=input]').should('have.value', 'Nueva tarea')
  });

  test('Debe limpiar el cambpo al presionar enter', () => {
    cy.get('[data-testid=input]').type('Nueva tarea');
    cy.get('[data-testid=input]').should('have.value', 'Nueva tarea')
    cy.get('[data-testid=input]').type('{enter}');

    cy.get('[data-testid=input][data-testid=input]').should('have.value', '')
  });
});

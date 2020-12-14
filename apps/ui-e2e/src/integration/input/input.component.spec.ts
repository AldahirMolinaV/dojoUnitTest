test = it;

describe('ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=inputcomponent--primary'));

  test('Debe ingresar una nueva tarea', () => {
    cy.get('[data-testid=input]').type('Nueva tarea');
    cy.get('[data-testid=input]').should('have.value', 'Nueva tarea')
  });

  test('El campo de entrada debe enfocarse cuando se cargar la pagina', () => {
    cy.get('[data-testid=input]').first().focus()
  });

  test('Debe limpiar el campo al presionar enter', () => {
    cy.get('[data-testid=input]').type('Nueva tarea');
    cy.get('[data-testid=input]').should('have.value', 'Nueva tarea')
    cy.get('[data-testid=input]').type('{enter}');
    cy.get('[data-testid=input]').should('have.value', '')
  });

});

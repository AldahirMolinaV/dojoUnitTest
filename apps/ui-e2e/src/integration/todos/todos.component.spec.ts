test = it;

describe('ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=todoscomponent--primary'));

  test('should render the component', () => {
    cy.get('input').type('Esto es una prueba funcional automatizada');
    cy.get('#boton').click();

    cy.get('input').should('have.value', 'TestEsto es una prueba funcional automatizada')
  });
});

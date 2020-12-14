test = it;

describe('ui', () => {
  beforeEach(() => cy.visit('http://todomvc.com/examples/angularjs/#/'));

  test('Debe ingresar una nueva tarea', () => {
    cy.get('.new-todo').type('Nueva tarea');
    cy.get('.new-todo').should('have.value', 'Nueva tarea')
  });

  test('El campo de entrada debe enfocarse cuando se cargar la pagina', () => {
    cy.get('.new-todo').focus()
  });

  test('Debe limpiar el campo al presionar enter', () => {
    cy.get('.new-todo').type('Nueva tarea');
    cy.get('.new-todo').should('have.value', 'Nueva tarea')
    cy.get('.new-todo').type('{enter}');
    cy.get('.new-todo').should('have.value', '')
  });

  test('La tarea debe ser agregada a la lista', () => {
    cy.get('.new-todo').type('Nueva tarea');
    cy.get('.new-todo').type('{enter}');
    cy.get('.ng-binding').should('contain.text','Nueva tarea');
  });

  test('Asegurar que no se permita espacios en blanco antes o al final de la entrada', () => {
    cy.get('.new-todo').type('        Nueva tarea        ');
    cy.get('.new-todo').type('{enter}');
    cy.get('.ng-binding').should('contain.text','Nueva tarea');
  });

  test('Verificar que no se ingresen tareas vacías', () => {
    cy.get('.new-todo').type(' ');
    cy.get('.new-todo').type('{enter}');
    cy.get('.ng-binding').should('contain',0);
    cy.get('.todo-list > li').should($list => {
      expect($list).to.have.length(0)
    })
  });

  test('Marcar todo como completado y validar cambio de estado a completada', () => {
    cy.get('.new-todo').type('Tarea uno');
    cy.get('.new-todo').type('{enter}');
    cy.get('.new-todo').type('Tarea Dos');
    cy.get('.new-todo').type('{enter}');
    cy.get('.new-todo').type('Tarea Tres');
    cy.get('.new-todo').type('{enter}');
    cy.get('.toggle').check();
    cy.get('.todo-list > li').should('have.class', 'completed')
  });

  test('Marcar Borrar completado y validar eliminacion de tareas con estado completado', () => {
    cy.get('.new-todo').type('Tarea Uno');
    cy.get('.new-todo').type('{enter}');
    cy.get('.new-todo').type('Tarea Dos');
    cy.get('.new-todo').type('{enter}');
    cy.get('.new-todo').type('Tarea Tres');
    cy.get('.new-todo').type('{enter}');
    cy.get('.toggle').check();
    cy.get('.todo-list > li').should('have.class', 'completed')
    cy.get('.clear-completed').click();
    cy.get('.ng-binding').should('contain',0);
    cy.get('.todo-list > li').should($list => {
      expect($list).to.have.length(0)
    })
  });

  test('Actualizar tareas completadas', () => {
    cy.get('.new-todo').type('Tarea uno');
    cy.get('.new-todo').type('{enter}');
    cy.get('.new-todo').type('Tarea Dos');
    cy.get('.new-todo').type('{enter}');
    cy.get('.new-todo').type('Tarea Tres');
    cy.get('.new-todo').type('{enter}');
    cy.get('.todo-list').get('.ng-scope').get('.view').get('.toggle').eq(1).check()
    cy.get('.toggle').check();
    cy.get('.todo-list > li').should('have.class', 'completed')
  });

  test('Marcar una tarea como completada', () => {
    cy.get('.new-todo').type('Tarea uno');
    cy.get('.new-todo').type('{enter}');
    cy.get('.new-todo').type('Tarea Dos');
    cy.get('.new-todo').type('{enter}');
    cy.get('.todo-list').get('.ng-scope').get('.view').get('.toggle').eq(1).check();
    cy.get('.filters > li').eq(2).click();
    cy.get('.todo-list > li').should($list => {
      expect($list).to.have.length(1)
    })
  });

  test('Validar activacion del modo edicion', () => {
    cy.get('.new-todo').type('Tarea uno');
    cy.get('.new-todo').type('{enter}');
    cy.get('.todo-list').get('.ng-scope').get('.view').get('.ng-binding').eq(0).dblclick();
    cy.get('.todo-list > li').should('have.class', 'editing');
  });

  test('Visualizar boton eliminar tras pasar el cursor', () => {
    cy.get('.new-todo').type('Tarea uno');
    cy.get('.new-todo').type('{enter}');
    cy.get('.destroy').invoke('show');
    cy.get('.destroy').should('be.visible')
  });

  test('Activar modo edicion y validar que se oculten los otros controles y enfocar titulo de la tarea', () => {
    cy.get('.new-todo').type('Tarea uno');
    cy.get('.new-todo').type('{enter}');
    cy.get('.todo-list').get('.ng-scope').get('.view').get('.ng-binding').eq(0).dblclick();
    cy.get('.toggle').should('not.be.visible');
    cy.get('.destroy').should('not.be.visible');
  });

  test('La edición debe guardarse tanto en el evento blur como la presionar la tecla enter', () => {
    cy.get('.new-todo').type('Tarea uno');
    cy.get('.new-todo').type('{enter}');
    cy.get('.todo-list').get('.ng-scope').get('.view').get('.ng-binding').eq(0).dblclick();
    cy.get('.new-todo').focus().blur();
    cy.get('.todo-list > li').should('not.have.class', 'editing');
  });

  test('Scape y descartar cambios', () => {
    cy.get('.new-todo').type('Tarea uno');
    cy.get('.new-todo').type('{enter}');
    cy.get('.todo-list').get('.ng-scope').get('.view').get('.ng-binding').eq(0).dblclick();
    cy.get('.new-todo').type('{esc}');
    cy.get('.todo-list > li').should('not.have.class', 'editing');
  });

  test('Se debe mostrar el número de tareas activas en forma pluralizada. Ejemplo quedan 2 tareas pendientes.', () => {
    cy.get('.new-todo').type('Tarea uno');
    cy.get('.new-todo').type('{enter}');
    cy.get('.new-todo').type('Tarea Dos');
    cy.get('.new-todo').type('{enter}');
    cy.get('.todo-count').should('contain.text','items left');
  });

  test('La opción “Eliminar completadas”, remueve las tareas completadas al hacer clic.', () => {
    cy.get('.new-todo').type('Tarea uno');
    cy.get('.new-todo').type('{enter}');
    cy.get('.new-todo').type('Tarea Dos');
    cy.get('.new-todo').type('{enter}');
    cy.get('#toggle-all').click({ force: true});
    cy.get('.clear-completed').click();
    cy.get('.todo-list > li').should($list => {
      expect($list).to.have.length(0)
    })

  });

});

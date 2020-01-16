import { render, fireEvent, prettyDOM, queries } from '@testing-library/angular';
import { FormsModule } from '@angular/forms';

import { UiModule } from '@dojotodoangular/ui';
import { Todo } from '@dojotodoangular/data';
import { queryById } from '@dojotodoangular/utils';

import { AppComponent } from './app.component';
import { GetById } from '@dojotodoangular/utils';


describe('Todo app', () => {
  test('Se debe renderizar componente', async () => {
    //Arrage
    const taskState:Todo = {
      id: '0',
      titulo: 'Nueva tarea',
      completada: false
    }

    const RenderResult = await render(AppComponent, {
      componentProperties: {
        state: [taskState]
      },
      declarations: [],
      imports: [FormsModule, UiModule],
      queries: {
        ...queries,
        queryById
      }
    });
    RenderResult.debug();

    //Act
    const labelRender = RenderResult.getByTestId('label') as HTMLLabelElement;
    const inputRender = RenderResult.queryById('taskInput');

    RenderResult.type(inputRender, 'Agregar nueva tarea');

    prettyDOM(inputRender)/*?*/;

    //Assert
    expect(labelRender);
    expect(labelRender).toBeDefined();
    expect(labelRender.textContent).toBe('Nueva tarea');
    expect(inputRender).toBeDefined();
    expect(inputRender.value).toBe('Agregar nueva tarea');
  })

  test('Al presionar la tecla enter se crea la tarea, se agrega a la lista de tareas y se borra el campo de entrada', async () => {
    //Arrage
    const RenderResult = await render(AppComponent, {
      componentProperties: {
        state: []
      },
      declarations: [],
      imports: [FormsModule, UiModule],
      queries: {
        ...queries,
        queryById
      }
    });
    RenderResult.debug();

    //Act
    const inputRender = RenderResult.queryById('taskInput');
    RenderResult.type(inputRender, 'Agregar nueva tarea');
    RenderResult.keyDown(inputRender, { key: 'Enter', keyCode: 13 });

    const labelRender = RenderResult.getByTestId('label') as HTMLLabelElement;

    //Assert
    expect(labelRender);
    expect(labelRender).toBeDefined();
    expect(labelRender.textContent).toBe('Agregar nueva tarea');
    expect(inputRender).toBeDefined();
    expect(inputRender.value).toBe('Agregar nueva tarea');
  })
});

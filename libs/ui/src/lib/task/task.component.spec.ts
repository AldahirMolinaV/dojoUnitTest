import { render, fireEvent, prettyDOM } from '@testing-library/angular';
import { TaskComponent } from './task.component';
import { LabelComponent } from '../label/label.component';
import { InputComponent } from '../input/input.component';
import { FormsModule } from '@angular/forms';
import { Todo } from '@dojotodoangular/data'

describe('Suite Task', () => {
  test('Se debe renderizar componente', async () => {
    //Arrage
    const taskState:Todo = {
      id: '0',
      titulo: 'Nueva tarea',
      completada: false
    }

    const RenderResult = await render(TaskComponent, {
      componentProperties: {
        todo: taskState,
        activo: false
      },
      declarations: [InputComponent, LabelComponent],
      imports: [FormsModule]
    });

    //Act
    const labelRender = RenderResult.getByTestId('label') as HTMLLabelElement;
    const inputRender = RenderResult.queryByTestId('input');

    //Assert
    expect(labelRender);
    expect(labelRender).toBeDefined();
    expect(labelRender.textContent).toBe('Nueva tarea');
    expect(inputRender).toBeNull();
  })

  test('Se debe renderizar componente', async () => {
    //Arrage
    const taskState:Todo = {
      id: '0',
      titulo: 'Nueva tarea',
      completada: false
    }

    const RenderResult = await render(TaskComponent, {
      componentProperties: {
        todo: taskState,
        activo: true
      },
      declarations: [InputComponent, LabelComponent],
      imports: [FormsModule]
    });

    //Act
    const labelRender = await RenderResult.queryByTestId('label');
    const inputRender = await RenderResult.queryByTestId('input') as HTMLInputElement;

    //Assert
    expect(labelRender);
    expect(labelRender).toBeNull();
    expect(inputRender).toBeDefined();
    expect(inputRender.value).toBe('Nueva tarea');
  });

  test('Al hacer doble clic en el <label> activa el modo de edición', async () => {
    //Arrage
    const taskState:Todo = {
      id: '0',
      titulo: 'Nueva tarea',
      completada: false
    }

    const RenderResult = await render(TaskComponent, {
      componentProperties: {
        todo: taskState,
        activo: false
      },
      declarations: [InputComponent, LabelComponent],
      imports: [FormsModule]
    });

    //Act
    RenderResult.doubleClick(RenderResult.getByTestId('label'));

    const labelRender = await RenderResult.queryByTestId('label') as HTMLLabelElement;
    const inputRender = await RenderResult.getByTestId('input') as HTMLInputElement;

    //Assert
    expect(labelRender);
    expect(labelRender).toBeNull();
    expect(inputRender).toBeDefined();
    expect(inputRender.value).toBe('Nueva tarea');
  });

  test('Al hacer blur en el <input> inactiva el modo de edición', async () => {
    //Arrage
    const taskState:Todo = {
      id: '0',
      titulo: 'Nueva tarea',
      completada: false
    }

    const RenderResult = await render(TaskComponent, {
      componentProperties: {
        todo: taskState,
        activo: true
      },
      declarations: [InputComponent, LabelComponent],
      imports: [FormsModule]
    });

    //Act
    RenderResult.blur(RenderResult.getByTestId('input'));

    const labelRender = await RenderResult.queryByTestId('label') as HTMLLabelElement;
    const inputRender = await RenderResult.getByTestId('input') as HTMLInputElement;

    //Assert
    expect(inputRender);
    expect(inputRender).toBeDefined();
    expect(inputRender.value).toBe('Nueva tarea');
    expect(labelRender).toBeNull();
  });
});

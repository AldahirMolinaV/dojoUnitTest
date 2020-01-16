import { render, fireEvent, prettyDOM } from '@testing-library/angular';
import { InputComponent } from './input.component';
import { FormsModule } from '@angular/forms';
import { when } from 'jest-when';

describe('Suite Input field', () => {
  test('Se debe poder ingresar una nueva tarea en la opción de entrada en la parte superior de la aplicación', async () => {
    //Arrage
    const RenderResult = await render(InputComponent, {
      componentProperties: { },
      imports: [FormsModule]
    });

    //Act
    const inputRender = RenderResult.getByTestId('input') as HTMLInputElement;

    RenderResult.type(inputRender, 'Tarea de prueba');

    //Assert
    expect(inputRender);
    expect(inputRender.value).toBe('Tarea de prueba');
  })

  test('Al presionar la tecla enter se crea la tarea, se agrega a la lista de tareas y se borra el campo de entrada.', async () => {
    //Arrage
    const keydownEmitterMock = jest.fn();

    const RenderResult = await render(InputComponent, {
      componentProperties: { 
        keydownEmitter: {
          emit: keydownEmitterMock,
        } as any,
      },
      imports: [FormsModule]
    });

    //Act
    const inputRender = RenderResult.getByTestId('input') as HTMLInputElement;

    RenderResult.type(inputRender, 'Tarea de prueba');
    RenderResult.keyDown(inputRender, { key: 'Enter', keyCode: 13 });

    //Assert
    expect(inputRender);
    when(keydownEmitterMock).calledWith('Tarea de prueba');
  })

  test('Asegúrese de no permitir espacios en blanco antes o al final de la entrada y verifique que no se ingresen tareas vacías.', async () => {
    //Arrange
    const keydownEmitterMock = jest.fn();

    const RenderResult = await render(InputComponent, {
      componentProperties: { 
        keydownEmitter: {
          emit: keydownEmitterMock,
        } as any,
      },
      imports: [FormsModule]
    });

    //Act
    const inputRender = RenderResult.getByTestId('input') as HTMLInputElement;

    RenderResult.type(inputRender, ' Tarea de prueba ');
    RenderResult.keyDown(inputRender, { key: 'Enter', keyCode: 13 });

    //Assert
    expect(inputRender);
    expect(keydownEmitterMock).not.toHaveBeenCalledWith('');
    expect(keydownEmitterMock).toHaveBeenCalledWith('Tarea de prueba');
  });
})
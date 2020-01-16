import { render, fireEvent, prettyDOM } from '@testing-library/angular';
import { LabelComponent } from './label.component';
import { FormsModule } from '@angular/forms';

describe('Suite Label', () => {
  test('Se debe renderizar componente', async () => {
    //Arrage
    const RenderResult = await render(LabelComponent, {
      componentProperties: { 
        value: 'Nueva tarea'
      },
      imports: [FormsModule]
    });

    //Act
    const labelRender = RenderResult.getByTestId('label') as HTMLLabelElement;

    //Assert
    expect(labelRender);
    expect(labelRender.textContent).toBe('Nueva tarea');
  })

  test('Al hacer doble clic en el <label> activa el modo de edición', async () => {
    //Arrage
    const doubleClickEmitterMock = jest.fn();

    const RenderResult = await render(LabelComponent, {
      componentProperties: { 
        value: 'Nueva tarea',
        doubleClickEmitter: {
          emit: doubleClickEmitterMock
        } as any,
      },
      imports: [FormsModule]
    });

    //Act
    const labelRender = RenderResult.getByTestId('label') as HTMLLabelElement;
    RenderResult.doubleClick(labelRender);

    //Assert
    expect(labelRender);
    expect(doubleClickEmitterMock.mock.calls.length).toBe(1);
    expect(doubleClickEmitterMock.mock.calls[0][0]).toBe('doubleClick');
  })
})
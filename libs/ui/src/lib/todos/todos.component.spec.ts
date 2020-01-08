import { render } from '@testing-library/angular';
import { TodosComponent } from './todos.component';

describe('Suite Todo', () => {
  test('Debe validar que el componente se renderize correctamente', async () => {
    //Arrage
    const RenderResult = await render(TodosComponent, {
      componentProperties: { },
    });

    //Act
    const componentRender = RenderResult.getByRole('texto');

    //Assert
    expect(componentRender);
    expect(componentRender).toMatchSnapshot();
  })
})

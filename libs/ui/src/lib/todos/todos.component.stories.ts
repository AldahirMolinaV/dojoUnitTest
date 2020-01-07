
import { UiModule } from '../ui.module';
import { TodosComponent } from './todos.component';

export default {
  title: 'TodosComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: []
  },
  component: TodosComponent,
  props: {
  }
})

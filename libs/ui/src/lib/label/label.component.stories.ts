
import { UiModule } from '../ui.module';
import { LabelComponent } from './label.component';

export default {
  title: 'LabelComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: []
  },
  component: LabelComponent,
  props: {
    value: 'Nueva tarea'
  }
})

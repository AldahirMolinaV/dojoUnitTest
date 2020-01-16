
import { UiModule } from '../ui.module';
import { InputComponent } from './input.component';
import { FormsModule } from '@angular/forms';

export default {
  title: 'InputComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: [ FormsModule ]
  },
  component: InputComponent,
  props: {
    placeholder: 'Escribe tus tareas',
    keydownEmitter: {
      emit: (text) => {alert(text);},
    } as any,
  }
})

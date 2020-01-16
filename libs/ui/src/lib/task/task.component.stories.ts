
import { UiModule } from '../ui.module';
import { TaskComponent } from './task.component';
import { LabelComponent } from '../label/label.component';
import { InputComponent } from '../input/input.component';
import { FormsModule } from '@angular/forms';

export default {
  title: 'TaskComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: [FormsModule],
    declarations: [InputComponent, LabelComponent]
  },
  component: TaskComponent,
  props: {
    todo: {
      id: '0',
      titulo: 'Nueva tarea',
      completada: false
    }
  }
})

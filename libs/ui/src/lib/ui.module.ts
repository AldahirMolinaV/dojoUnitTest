import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodosComponent } from './todos/todos.component';
import { InputComponent } from './input/input.component';
import { LabelComponent } from './label/label.component';
import { TaskComponent } from './task/task.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [TodosComponent, InputComponent, LabelComponent, TaskComponent],
  exports: [TodosComponent, InputComponent, LabelComponent, TaskComponent]
})
export class UiModule {}

import { Component, OnInit, Input, ViewChild, AfterViewChecked } from '@angular/core';
import { Todo } from '@dojotodoangular/data';
import { InputComponent } from '../input/input.component';
import { LabelComponent } from '../label/label.component';

@Component({
  selector: 'dojotodoangular-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements AfterViewChecked, OnInit {
  @Input() todo: Todo;
  @Input() activo = false;

  @ViewChild(InputComponent, {
    static: false
  }) inputComponent: InputComponent;
  @ViewChild(LabelComponent, {
    static: false
  }) labelComponent: LabelComponent;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewChecked(): void {
    if(!this.activo){
      this.labelComponent.doubleClickEmitter.subscribe(event => {
        this.activo = true;
      })
    }else{
      this.inputComponent.blurEmitter.subscribe(event => {
        this.activo = false;
      })
    }
  }

}

import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Todo } from '@dojotodoangular/data';
import { InputComponent } from '@dojotodoangular/ui';

@Component({
  selector: 'dojotodoangular-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'todo';
  private state:Todo[] = []
  @ViewChild(InputComponent, {static: true}) taskInput !: InputComponent;

  ngAfterViewInit() {
    this.taskInput.enterEmitter.subscribe((titulo) => {
      this.state.push({
        id: `${this.state.length}`,
        titulo,
        completada: false
      });
    });
  }
}

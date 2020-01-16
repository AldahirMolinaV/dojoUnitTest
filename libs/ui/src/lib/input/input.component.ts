import { Component, OnInit, EventEmitter, Output, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'dojotodoangular-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() id !: string;
  @Input() value = '';
  @Input() placeholder = '';
  @Output() keydownEmitter = new EventEmitter<string>();
  @Output() blurEmitter = new EventEmitter<string>();
  @Output() enterEmitter = new EventEmitter<string>();

  constructor() { 
    console.log({id:this.id});
  }

  ngOnInit() {
  }

  emitRefactor(value:string){
    const newValue = value ? value.trim() : undefined;
    if(newValue) {
      this.keydownEmitter.emit(newValue);
    }
  }

  keydown(event: any) {
    if(event.keyCode === 13 && this.value ? this.value.trim(): undefined){
      this.enterEmitter.emit(this.value);
      this.value = '';
      this.emitRefactor(null);
    }
  }

  modelChange(value: string) {
    this.emitRefactor(value);
  }

  blur(event: any) {
    this.emitRefactor('onBlur');
  }
}

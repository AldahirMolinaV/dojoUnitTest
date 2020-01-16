import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dojotodoangular-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {
  @Input() value = '';

  @Output() doubleClickEmitter = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit() {
  }

  ondblclick(event:any){
    console.log(event);
    this.doubleClickEmitter.emit("doubleClick")
  }
}

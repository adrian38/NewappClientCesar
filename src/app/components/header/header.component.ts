import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() clickedClose = new EventEmitter();
  @Input() expandText: string = "Text";
  @Input() expandHeader: boolean = false;
  @Input() fillBackground: boolean = false;
  @Input() headerText: string = "Header";

  constructor() {
    console.log("constructor fillBackground", this.fillBackground);
  }

  ngOnInit() {
    console.log("ngOnInit fillBackground", this.fillBackground);
  }

  closeEvent(){
    this.clickedClose.emit();
  }

}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() fillBackground: boolean = false;
  @Input() headerText: string = "Header";

  constructor() {
    console.log("constructor fillBackground", this.fillBackground);
  }

  ngOnInit() {
    console.log("ngOnInit fillBackground", this.fillBackground);
  }

}

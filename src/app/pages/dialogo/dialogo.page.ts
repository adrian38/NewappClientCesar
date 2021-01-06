import { Component, OnInit } from '@angular/core';
import {DialogModule} from 'primeng/dialog';
@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.page.html',
  styleUrls: ['./dialogo.page.scss'],
})
export class DialogoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  display: boolean = false;

    showDialog() {
        this.display = true;
    }


}

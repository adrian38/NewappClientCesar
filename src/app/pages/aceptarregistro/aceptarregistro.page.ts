import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aceptarregistro',
  templateUrl: './aceptarregistro.page.html',
  styleUrls: ['./aceptarregistro.page.scss'],
})
export class AceptarregistroPage implements OnInit {
  
   aceptar:boolean=true;

  constructor() { }

  ngOnInit() {
  }
  condiciones(){
    if(this.aceptar==true)
this.aceptar=false;
else
this.aceptar=true;
  }
}

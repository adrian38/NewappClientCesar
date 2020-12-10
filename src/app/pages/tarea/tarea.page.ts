import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { ObtSubSService } from 'src/app/services/obt-sub-s.service';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.page.html',
  styleUrls: ['./tarea.page.scss'],
})
export class TareaPage implements OnInit {

  fontaneria:boolean=false;
  electricidad:boolean=false; 

  constructor(private Serv: ObtSubSService,
              public navCtrl:NavController) { }

  ngOnInit() {
  }
  fontaneriaF(){
    console.log("f");
    this.fontaneria=this.fontaneria;
    this.electricidad=false;
    this.Serv.setServ("FONTANERIA");
  
    this.navCtrl.navigateRoot('nueva-solicitud');
  }

  electricidadF(){
    console.log("e");
    this.fontaneria=false;
    this.electricidad=this.electricidad;
    this.Serv.setServ("ELECTRICIDAD");
    this.navCtrl.navigateRoot('nueva-solicitud');
  }
}

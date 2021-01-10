import { Component, OnInit, ViewChild } from '@angular/core';
import { IonCheckbox, NavController,Platform } from '@ionic/angular';

import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.page.html',
  styleUrls: ['./tarea.page.scss'],
})
export class TareaPage implements OnInit {



  servicios_activos:string[]=["fontaneria"];

  constructor(private Serv: ObtSubSService,
              public navCtrl:NavController,
              private route:Router,
              private platform: Platform,
              private _location: Location) { 

               this.platform.backButton.subscribeWithPriority(10, () => {
                this.navCtrl.navigateRoot('/tabs/tab1', {animated: true, animationDirection: 'back' }) ;
                 }); 
              }

  ngOnInit() {
  
  
    

  }

  seleccionado(i){
    this.Serv.setServ(this.servicios_activos[i]); 
   
    this.navCtrl.navigateRoot('/titulo', {animated: true, animationDirection: 'forward' }) ;

  }
}

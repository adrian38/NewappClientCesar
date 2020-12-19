import { Component, OnInit } from '@angular/core';
import { NavController,Platform } from '@ionic/angular';

import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.page.html',
  styleUrls: ['./tarea.page.scss'],
})
export class TareaPage implements OnInit {

  fontaneria:boolean=false;
  electricidad:boolean=false; 

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
  fontaneriaF(){
   /*  console.log("f");
    this.fontaneria=this.fontaneria;
    this.electricidad=false;
    this.Serv.setServ("FONTANERIA"); */
    
    //this.route.navigateByUrl ('/nueva-solicitud', {replaceUrl : true}) ;
    this.navCtrl.navigateRoot('/nuevasolicitd', {animated: true, animationDirection: 'forward' }) ;
    
  // this.navCtrl.navigateRoot('/nueva-solicitud');
  }

  electricidadF(){
   /*  console.log("e");
    this.fontaneria=false;
    this.electricidad=this.electricidad;
    this.Serv.setServ("ELECTRICIDAD"); */
   // this.route.navigateByUrl ('/nueva-solicitud', {replaceUrl : true}) ;
   this.navCtrl.navigateRoot('/nuevasolicitd', {animated: true, animationDirection: 'forward' }) ;
    
  // this.navCtrl.navigateRoot('/nueva-solicitud');
  }
}

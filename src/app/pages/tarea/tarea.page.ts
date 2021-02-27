import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonCheckbox, NavController,Platform } from '@ionic/angular';

import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.page.html',
  styleUrls: ['./tarea.page.scss'],
})
export class TareaPage implements OnInit {



  servicios_activos:string[]=["Fontaneria"];

  constructor(private Serv: ObtSubSService,
              public navCtrl:NavController,
              private route:Router,
              private platform: Platform,
              private datos:ObtSubSService,
              public alertController: AlertController,
              private _location: Location) { 

              
              }

  ngOnInit() {
  
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.presentAlert();
      }); 
    

  }

  seleccionado(i){
    this.Serv.setServ(this.servicios_activos[i]); 
   
    this.navCtrl.navigateRoot('/titulo', {animated: true, animationDirection: 'forward' }) ;

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message: 'Desea cancelar la solicitud',
     
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          handler: (datos) => {
            this.borrar_campos();
            this.navCtrl.navigateRoot('/tabs/tab1', {animated: true, animationDirection: 'back' }) ;
      
          }
        }
      ]
    });
  
    await alert.present();
  } 
  
  borrar_campos(){
  
    this.datos.setTitulo("");
  
    this.datos.setcalle("");
    this.datos.setpuerta("");
    this.datos.setpiso("");
    this.datos.setescalera("");
    this.datos.setcod_postal("");
    this.datos.setnumero("");
    this.datos.setportal("");
  
    this.datos.setcomentario("");
  }
  
}

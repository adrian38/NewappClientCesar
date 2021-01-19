import { Component, NgZone ,OnInit} from '@angular/core';
import { AlertController, NavController,Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import {  TaskModel } from 'src/app/models/task.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthOdooService } from 'src/app/services/auth-odoo.service';


import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { TaskOdooService } from 'src/app/services/task-odoo.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Location } from '@angular/common';
import { async } from '@angular/core/testing';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  cant;
  id_string: string;
  task: TaskModel;
  solicitudesList: TaskModel[];
  
  tasksList$: Observable<TaskModel[]>; // servicio comunicacion
  tab: String;
  tab$: Observable<String>;

  notificationTabs$: Observable<boolean>;

  
  user:UsuarioModel;

  constructor(private subServ: ObtSubSService,
    private _taskOdoo: TaskOdooService,
    private ngZone: NgZone,
    public navCtrl:NavController,
    private platform: Platform,
    public alertCtrl: AlertController) {

  this.solicitudesList = this.subServ.getSolicitudeList();

  }

  ngOnInit(): void {

    this.platform.backButton.subscribeWithPriority(10, () => {
      this.presentAlert();
    });

   this.notificationTabs$ = this.subServ.getNotificationSetTab$();
   this.notificationTabs$.subscribe(notificationTab => {
 
   this.ngZone.run(()=>{

    this.solicitudesList = this.subServ.getSolicitudeList();
     console.log('tabs1',this.solicitudesList);

   });

   });
  

  }

  

  in(i) {
    this.cant = i;
    this.subServ.setposicion(this.cant);

    this.task = this.solicitudesList[this.cant];
    this._taskOdoo.setTaskCesar(this.task);
    console.log(this.task);
    // console.log("f",this.solicitudesList[this.cant].id_string);
    this.id_string = this.solicitudesList[this.cant].id_string;
    this.subServ.setidString(this.id_string);


  }
  irSolicitud(){
  
    this.navCtrl.navigateRoot('/tarea', {animated: true, animationDirection: 'forward' }) ;
    
  }



  async presentAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message: 'Desea registrarse con otro usuario',
     
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
            this.navCtrl.navigateRoot('/login', {animated: true, animationDirection: 'back' }) ;      
    
          }
        }
      ]
    });

    await alert.present();
  } 
  cancelar(i:number){
    console.log("cancel",i)


   

    this.task = this.solicitudesList[i];
    this._taskOdoo.setTaskCesar(this.task);
    console.log(this.task);
    // console.log("f",this.solicitudesList[this.cant].id_string);
     //let id = this.solicitudesList[this.cant].id;
    

    this._taskOdoo.cancelSOclient(this.task.id); 
  }

}
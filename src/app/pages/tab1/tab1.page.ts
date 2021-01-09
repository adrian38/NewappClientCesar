import { Component, NgZone ,OnInit} from '@angular/core';
import { AlertController, NavController,Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import {  TaskModel } from 'src/app/models/task.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthOdooService } from 'src/app/services/auth-odoo.service';


import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { TaskOdooService } from 'src/app/services/task-odoo.service';


import { Location } from '@angular/common';


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
    public alertController: AlertController,
    private _authOdoo: AuthOdooService,
    private _location: Location) {

  this.solicitudesList = this.subServ.getSolicitudeList();

  
  
     
  
  this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
    console.log('Back press handler!');
    if (this._location.isCurrentPathEqualTo('/tabs/tab1')) {

      // Show Exit Alert!
      console.log('Show Exit Alert!');
      this.showExitConfirm();
      processNextHandler();
    } else {

      // Navigate to back page
      console.log('Navigate to back page');
      this._location.back();

    }

  });
  }

  ngOnInit(): void {
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




  showExitConfirm() {
    this.alertController.create({
      header: 'App termination',
      message: 'Do you want to close the app?',
      backdropDismiss: false,
      buttons: [{
        text: 'Stay',
        role: 'cancel',
        handler: () => {
          console.log('Application exit prevented!');
        }
      }, {
        text: 'Exit',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    })
      .then(alert => {
        alert.present();
      });
  }
    
  
  
}

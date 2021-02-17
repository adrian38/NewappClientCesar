import { Component, NgZone ,OnInit} from '@angular/core';
import { AlertController, NavController,LoadingController,Platform } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import {  TaskModel } from 'src/app/models/task.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthOdooService } from 'src/app/services/auth-odoo.service';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { TaskOdooService } from 'src/app/services/task-odoo.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {MessageService} from 'primeng/api';
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
  tab: String;
  user:UsuarioModel;
  loading:any ;
  
  notificationTabs$: Observable<boolean>;
  notificationSOCancelled$ :Observable<number>;

  subscriptionNotificationSoCancel: Subscription;
  subscriptionNotificationTab: Subscription;

  
 

  constructor(private subServ: ObtSubSService,
    private _taskOdoo: TaskOdooService,
    private ngZone: NgZone,
    public navCtrl:NavController,
    private platform: Platform,
    public alertCtrl: AlertController,
    private messageService: MessageService,
    public loadingController: LoadingController) {

    this.solicitudesList = this.subServ.getSolicitudeList();

  }

  ngOnInit(): void {


      this.platform.backButton.subscribeWithPriority(10, () => {
      this.presentAlert();
    });

    this.notificationSOCancelled$ = this._taskOdoo.getNotificationSoCancelled$();
    this.subscriptionNotificationSoCancel = this.notificationSOCancelled$.subscribe(notificationCancel=>{
      this.ngZone.run(()=>{
        //////////////////////////////////////eliminar cargando
        this.loading.dismiss();
        this.messageService.add({ severity: 'error', detail: 'Solicitud eliminada'});
  
      });
    })
   
    this.notificationTabs$ = this.subServ.getNotificationSetTab$();
    this.subscriptionNotificationTab = this.notificationTabs$.subscribe(notificationTab => {
       this.ngZone.run(()=>{
        this.solicitudesList = this.subServ.getSolicitudeList();
        console.log('tabs1',this.solicitudesList);
   });

   });
  

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscriptionNotificationTab.unsubscribe();
    this.subscriptionNotificationSoCancel.unsubscribe();
    
  }

  

  in(i) {
    this.cant = i;
    this.subServ.setposicion(this.cant);

    this.task = this.solicitudesList[this.cant];
    this._taskOdoo.setTaskCesar(this.task);
    console.log(this.task);
    // console.log("f",this.solicitudesList[this.cant].id_string);
    /* this.id_string = this.solicitudesList[this.cant].id_string;
    
    this.subServ.setidString(this.id_string); */


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
    this._taskOdoo.cancelSOclient(this.task.id); 
    ////////////////////////Cargando
    this.presentLoading();
  }



  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message:'Eliminando Solicitud...',
      //duration: 2000
    });
    console.log("Loading Ok");
    return  this.loading.present();
  }

}
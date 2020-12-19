import { Component, NgZone ,OnInit} from '@angular/core';
import { AlertController, NavController,Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import {  TaskModel } from 'src/app/models/task.model';

import { AuthOdooService } from 'src/app/services/auth-odoo.service';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { TaskOdooService } from 'src/app/services/task-odoo.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';



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

  constructor(private subServ: ObtSubSService,
    private _taskOdoo: TaskOdooService,
    private _authOdoo: AuthOdooService,
    private ngZone: NgZone,
    public navCtrl:NavController,
    private route:Router,
    private platform: Platform,
    private _location: Location,
    public alertController: AlertController, 
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,) {

  this.solicitudesList = this.subServ.getSolicitudeList();
     
  
  this.initializeApp();
 
     
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
    //this.route.navigateByUrl ('/tarea', {replaceUrl : true}) ;
    this.navCtrl.navigateRoot('/tarea', {animated: true, animationDirection: 'forward' }) ;
    
    //this.navCtrl.navigateRoot('tarea');
   // this.navCtrl.navigateByUrl ('/tabs/tab1', {skipLocationChange: true}) ;
 
    //this.navCtrl.navigateBack('back');
    
  }




  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  
  
    this.platform.backButton.subscribeWithPriority(1, (processNextHandler) => {
      console.log('Back press handler!');
      if (this._location.isCurrentPathEqualTo('/tabs/tab1')) {
  
        // Show Exit Alert!
        console.log('Show Exit Alert!');
        this.navCtrl.navigateRoot('/login', {animated: true, animationDirection: 'forward' }) ;
    
        processNextHandler();
      } else {
  
        // Navigate to back page
        console.log('Navigate to back page');
        this.navCtrl.navigateRoot('/login', {animated: true, animationDirection: 'forward' }) ;
    
  
      }
  
    });
  
    
  }
  
}

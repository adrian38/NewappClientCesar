import { Component, NgZone ,OnInit} from '@angular/core';
import { AlertController, NavController,Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import {  TaskModel } from 'src/app/models/task.model';


import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { TaskOdooService } from 'src/app/services/task-odoo.service';




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
    private ngZone: NgZone,
    public navCtrl:NavController,
    private platform: Platform,
    public alertController: AlertController) {

  this.solicitudesList = this.subServ.getSolicitudeList();
     
  
  this.platform.backButton.subscribeWithPriority(10, () => {
    this.navCtrl.navigateRoot('/login', {animated: true, animationDirection: 'back' }) ;      
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
    //this.route.navigateByUrl ('/tarea', {replaceUrl : true}) ;
    this.navCtrl.navigateRoot('/tarea', {animated: true, animationDirection: 'forward' }) ;
    
    //this.navCtrl.navigateRoot('tarea');
   // this.navCtrl.navigateByUrl ('/tabs/tab1', {skipLocationChange: true}) ;
 
    //this.navCtrl.navigateBack('back');
    
  }




  
    
  
  
}

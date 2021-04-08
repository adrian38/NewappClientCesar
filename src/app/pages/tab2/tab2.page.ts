import { Component,ElementRef,NgZone, ViewChild } from '@angular/core';
import { Observable,Subscription } from 'rxjs';
import { Address, TaskModel } from 'src/app/models/task.model';

import { AuthOdooService } from 'src/app/services/auth-odoo.service';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { TaskOdooService } from 'src/app/services/task-odoo.service';
import { IonSegment, NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  @ViewChild ('segmentHist') segment:IonSegment;
  // @ViewChild("segmentHist", { read: ElementRef }) private mySegment: any;

  cant: number;
  id_string: string;
  task: TaskModel;
  contratadosList: TaskModel[];
  
  verservicios:boolean = true;
  verhistorial:boolean=false;
 
  valorSegment:string;
  
  tasksList$: Observable<TaskModel[]>; // servicio comunicacion
  tab: String;
  tab$: Observable<String>;

  notificationTabs2$: Observable<boolean>;

  subscriptionNotificationTabs2: Subscription;

  constructor(private subServ: ObtSubSService,
              private _taskOdoo: TaskOdooService,
              private ngZone: NgZone,
              public navCtrl:NavController,
              private platform: Platform)
               {

    this.contratadosList = this.subServ.getContratadosList();
    
    this.verservicios=true;
    this.verhistorial=false;

 /*    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot('/tabs/tab1', {animated: true, animationDirection: 'back' }) ;      
      }); */
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscriptionNotificationTabs2.unsubscribe();
   
    
  }

  ngOnInit(): void {

    
    setTimeout(()=>{
     
      this.segment.value = 'servicio';
    }, 100);
    
    this.notificationTabs2$ = this.subServ.getNotificationSetTab2$();
    this.subscriptionNotificationTabs2=this.notificationTabs2$.subscribe(notificationTab => {
      this.ngZone.run(()=>{
        this.contratadosList = this.subServ.getContratadosList();
        
      });
    });
  }
   in(i: number) {
     this.cant = i;
     this.subServ.setposicion(this.cant);
 
     this.task = this.contratadosList[this.cant];
     this._taskOdoo.setTaskCesar(this.task);
     
     
     this.id_string = this.contratadosList[this.cant].id_string;
     this.subServ.setidString(this.id_string);
 
 
   }

   inhistorial(j: number) {
     //Aqui hay cosas que arreglar*******
  
    this.subServ.setposicion(j);

    this.task = this.contratadosList[j];
    this._taskOdoo.setTaskCesar(this.task);
   

    this.navCtrl.navigateRoot('/histdetalle', {animated: true, animationDirection: 'back' }) ;      
  
  }


   segChange(event){
    this.valorSegment = event.detail.value;
   

    if(this.valorSegment==="servicio"){
     
      this.verservicios=true;
      this.verhistorial=false;
     
     
    }
    
    if(this.valorSegment==="historial"){
      this.verservicios=false;
      this.verhistorial=true;
     
    }

   

   
  }


}

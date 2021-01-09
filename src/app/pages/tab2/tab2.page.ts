import { Component,ElementRef,NgZone, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
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
  verhistorial:boolean;
 
  valorSegment:string;
  
  tasksList$: Observable<TaskModel[]>; // servicio comunicacion
  tab: String;
  tab$: Observable<String>;

  notificationTabs2$: Observable<boolean>;

  constructor(private subServ: ObtSubSService,
              private _taskOdoo: TaskOdooService,
              private ngZone: NgZone,
              public navCtrl:NavController,
              private platform: Platform)
               {

    this.contratadosList = this.subServ.getContratadosList();
    console.log(this.contratadosList,'tabs2 entro');
    this.verservicios=true;
    this.verhistorial=false;

    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot('/tabs/tab1', {animated: true, animationDirection: 'back' }) ;      
      });
  }
  ngOnInit(): void {
    setTimeout(()=>{
      console.log("ejecutando marcar 'contratados'");
      this.segment.value = 'servicio';
    }, 100);
    
    this.notificationTabs2$ = this.subServ.getNotificationSetTab2$();
    this.notificationTabs2$.subscribe(notificationTab => {
      this.ngZone.run(()=>{
        this.contratadosList = this.subServ.getContratadosList();
        console.log('tabs2',this.contratadosList);
      });
    });
  }
   in(i: number) {
     this.cant = i;
     this.subServ.setposicion(this.cant);
 
     this.task = this.contratadosList[this.cant];
     this._taskOdoo.setTaskCesar(this.task);
     console.log(this.task);
     // console.log("f",this.solicitudesList[this.cant].id_string);
     this.id_string = this.contratadosList[this.cant].id_string;
     this.subServ.setidString(this.id_string);
 
 
   }


   segChange(event){
    //this.valorSegment = event.detail.value;
    console.log(this.valorSegment);

    if(this.valorSegment==="servicio"){
     
      this.verservicios=true;
      this.verhistorial=false;
      console.log(this.verservicios);
     
    }
    
    if(this.valorSegment==="historial"){
      this.verservicios=false;
      this.verhistorial=true;
      console.log(this.verhistorial);
    }

   

   
  }


}


import { Component, NgZone, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { TaskOdooService } from 'src/app/services/task-odoo.service';
import { Address, TaskModel } from '../../models/task.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { DatePipe } from '@angular/common';

//-----------------------------------------------
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Photo, PhotoService } from '../../services/photo.service';

import { NgCalendarModule  } from 'ionic2-calendar';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import {CalendarModule} from 'primeng/calendar';



@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.page.html',
  styleUrls: ['./horarios.page.scss'],
})
export class HorariosPage implements OnInit {

  dat:string;
  tim:string;
  servicio:string="";
  viewTitle;
  fecha:Date ;
  reloj:Date;
   
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  }

  constructor(private datos:ObtSubSService,
    private date: DatePipe,
  
    private ngZone: NgZone,
    public navCtrl:NavController,
    public photoService: PhotoService, 
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    public calen:NgCalendarModule,
    private platform: Platform) { 

      this.fecha =new Date();
this.reloj=new Date();

this.platform.backButton.subscribeWithPriority(10, () => {
  this.navCtrl.navigateRoot('/titulo', {animated: true, animationDirection: 'back' }) ;
    
  });
     

}
ngOnInit() {
  this.servicio=this.datos.getServ();
 
}
  onViewTitleChanged(title) {
    this.viewTitle = title;
    
    // console.log(this.calendar.currentDate);
    }
    
    onCurrentDateChanged(event){
    
    this.fecha=event;
    
    //this.dia= this.fecha.getDate().toString();
    }
    cerrarsolicitud(){
      this.navCtrl.navigateRoot('/tabs/tab1', {animated: true, animationDirection: 'forward' }) ;
        
    
    }  
    goto(){

      this.dat = this.date.transform(this.fecha, 'yyyy-MM-dd');
      this.tim = this.date.transform(this.reloj, 'HH:mm:ss');  
      this.datos.setCalendarioD(this.dat);
      this.datos.setCalendarioT(this.tim);
        
      
      this.navCtrl.navigateRoot('/direccion', {animated: true, animationDirection: 'forward' }) ;
       
    }  
}

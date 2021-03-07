
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
import { PhotoService } from '../../services/photo.service';


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
    private platform: Platform,
    public alertCtrl: AlertController) { 

      this.fecha =new Date();
      this.reloj=new Date();


    
 
     

}
ngOnInit() {

  this.platform.backButton.subscribeWithPriority(10, () => {
    this.navCtrl.navigateRoot('/titulo', {animated: true, animationDirection: 'back' }) ;
  });

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
  
      this.presentAlert();
    }  
    goto(){

      this.dat = this.date.transform(this.fecha, 'yyyy-MM-dd');
     /*  this.tim = this.date.transform(this.reloj, 'HH:mm:ss');   */
      this.datos.setCalendarioD(this.dat);
      this.datos.setCalendarioT(this.reloj);
        
      
      this.navCtrl.navigateRoot('/direccion', {animated: true, animationDirection: 'forward' }) ;
       
    } 
    
async presentAlert() {
  const alert = await this.alertCtrl.create({
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
          this.navCtrl.navigateRoot('/tabs/tab1', {animated: true, animationDirection: 'forward' }) ;
    
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
  this.datos.setfoto00('../../../assets/fotoadd.png');
  this.datos.setfoto11('../../../assets/fotoadd.png');
  this.datos.setfoto22('../../../assets/fotoadd.png');  

  this.datos.setfoto0('');
  this.datos.setfoto1('');
  this.datos.setfoto2(''); 
}
}

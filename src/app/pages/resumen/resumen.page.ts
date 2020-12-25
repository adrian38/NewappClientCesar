

import { Component, NgZone, OnInit } from '@angular/core';
import { NavController, Platform} from '@ionic/angular';
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


import {MessageService} from 'primeng/api';



@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.page.html',
  styleUrls: ['./resumen.page.scss'],
})
export class ResumenPage implements OnInit {

  user:UsuarioModel;
  task:TaskModel;

  servicio:string="";
  titulo:string;
  check:boolean;
  fecha:string;
  hora:string;
  comentario:string;

  calle:string="";
  piso:string="";
  numero:string="";
  puerta:string="";
  portal:string="";
  cod_postal:string="";
  escalera:string="";
  
  notificationNewSoClient$: Observable<boolean>;
  notificationError$: Observable<boolean>;

  constructor(private datos:ObtSubSService,
    private date: DatePipe,
    private _taskOdoo: TaskOdooService,
    private ngZone: NgZone,
    public navCtrl:NavController,
    public photoService: PhotoService, 
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    public calen:NgCalendarModule,
    private platform: Platform,
    private messageService: MessageService
   ) { 

      this.platform.backButton.subscribeWithPriority(10, () => {
        this.navCtrl.navigateRoot('/foto', {animated: true, animationDirection: 'back' }) ;
          
        });
    }

  async ngOnInit() {

    this.servicio=this.datos.getServ();

    this.titulo=this.datos.gettitulo();
    this.check=this.datos.getUtiles();
    this.fecha=this.datos.getCalendarioD();
    this.hora=this.datos.getCalendarioT();
    this.comentario=this.datos.getcomentario();

    this.calle=this.datos.getcalle();
    this.portal=this.datos.getportal();
    this.puerta=this.datos.getpuerta();
    this.cod_postal=this.datos.getcod_postal();
    this.escalera=this.datos.getescalera();
    this.piso=this.datos.getpiso();
    this.numero=this.datos.getnumero();

    this.user=this._taskOdoo.getUser();

    this.notificationError$ = this._taskOdoo.getNotificationError$();
    this.notificationError$.subscribe(notificationError => {
    this.ngZone.run(() => {
    
    if (notificationError) {
    console.log("Error creando la tarea");
    }
    
    });
    
    });
    
    this.notificationNewSoClient$ = this._taskOdoo.getNotificationNewSoClient$();
    this.notificationNewSoClient$.subscribe(notificationNewSoClient => {
    this.ngZone.run(() => {
    
    if (notificationNewSoClient) {
    console.log("Se creo correctamente la tarea");
    //this.presentToast();
    this.navCtrl.navigateRoot('/tabs/tab1', {animated: true, animationDirection: 'forward' }) ;
        
    
    }
    
    });
    
    });
    //-----------------------
    await this.photoService.loadSaved();
    }

  cerrarsolicitud(){
    this.navCtrl.navigateRoot('/tabs/tab1', {animated: true, animationDirection: 'forward' }) ;
      
  
  }
  crearSolicitud(){
    this.task=new TaskModel();
    this.task.address=new Address('','','','','','','','','');
    
    
    
    
    
    this.task.require_materials=this.datos.getUtiles();
    this.task.description=this.datos.getcomentario();
    
    this.task.address.street=this.datos.getcalle();
    this.task.address.door=this.datos.getpuerta();
    this.task.address.stair=this.datos.getescalera();
    this.task.address.portal=this.datos.getportal();
    this.task.address.cp=this.datos.getcod_postal();
    this.task.address.number=this.datos.getnumero();
    this.task.address.floor=this.datos.getpiso();
    
    
    // this.task.title= 'Arreglo'
    this.task.title= this.datos.gettitulo();
    this.task.product_id = 39;
    this.task.type = ':Servicio de Fontaneria';
    
    //this.task.time = '12:12:12';
    // this.task.date = '2020-02-20'
    
   // this.task.date = this.date.transform(this.fecha, 'yyyy-MM-dd');
   // this.task.time = this.date.transform(this.reloj, 'HH:mm:ss');
    this.task.date = this.fecha;
    this.task.time = this.hora;
    this.task.client_id = this.user.partner_id;
    //time =  this.reloj.getHours().toString()+ ":"+ this.reloj.getMinutes().toString() + ":" + this.reloj.getSeconds().toString() 
    
    //this.task.date = this.fecha.getFullYear().toString() + "-" + (this.fecha.getMonth() +1).toString() + "-" +this.fecha.getDate().toString()
    
    //console.log("Vet",this.fecha.getDay+"-"+this.fecha.getFullYear().toString() + "-" + (this.fecha.getMonth() +1).toString() + "-" +this.fecha.getDate().toString());
    
    console.log(this.task)
    this._taskOdoo.newTask(this.task);
    
    
    
      
    
    }

 
  si(){
    this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
   
  }
}

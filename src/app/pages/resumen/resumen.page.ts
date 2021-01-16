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
import { PhotoService } from '../../services/photo.service';
import { Observable } from 'rxjs';
import {MessageService} from 'primeng/api';
import { DomSanitizer } from '@angular/platform-browser';
import { style } from '@angular/animations';


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
  latitud:string="";
  longitud:string="";
  
  notificationNewSoClient$: Observable<boolean>;
  notificationError$: Observable<boolean>;

  foto0:string="";

  constructor(private datos:ObtSubSService,
    private date: DatePipe,
    private _taskOdoo: TaskOdooService,
    private ngZone: NgZone,
    public navCtrl:NavController,
    public photoService: PhotoService, 
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    private platform: Platform,
    private messageService: MessageService,
    public sanitizer: DomSanitizer,
   ) { 

      
    }

   ngOnInit() {

    this.foto0=this.datos.getfoto0();
    console.log("tengo la foto")

    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot('/foto', {animated: true, animationDirection: 'back' }) ;
        
      });

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
   /*  this.longitud=this.datos.getlongitud().toString();
    this.latitud=this.datos.getlatitud().toString(); */

    this.user=this._taskOdoo.getUser();

    this.notificationError$ = this._taskOdoo.getNotificationError$();
    this.notificationError$.subscribe(notificationError => {
    this.ngZone.run(() => {
    
    if (notificationError) {
    console.log("Error creando la tarea");
    this.messageService.add({ severity: 'success', summary: 'Imcompleto', detail: 'No se creo la tarea.'});
  
    }
    
    });
    
    });
    
    this.notificationNewSoClient$ = this._taskOdoo.getNotificationNewSoClient$();
    this.notificationNewSoClient$.subscribe(notificationNewSoClient => {
    this.ngZone.run(() => {
    
    if (notificationNewSoClient) {
    console.log("Se creo correctamente la tarea");
    this.messageService.add({ severity: 'success', summary: 'Completado', detail: 'Se creo correctamente la tarea.'});
  
     
    setTimeout(() => {
      this.navCtrl.navigateRoot('/tabs/tab1', {animated: true, animationDirection: 'forward' }) ;
       
    },
      2000);
    }
    
    });
    
    });
    //-----------------------
   
    }

  cerrarsolicitud(){
this.borrar_campos();
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

    this.task.address.latitude=String(this.datos.getlatitud());
    this.task.address.longitude=String(this.datos.getlongitud());

    this.task.title= this.datos.gettitulo();
    this.task.product_id = 39;
    this.task.type = ':Servicio de Fontaneria';
    
    this.task.date = this.fecha;
    this.task.time = this.hora;
    this.task.client_id = this.user.partner_id;
   
     this.task.photoNewTaskArray[0]= this.photoService.devuelve64(); 
/*this.task.photoNewTaskArray[0]= this.datos.getfoto0(); */
    console.log("en resumen foto",this.task.photoNewTaskArray[0]);
    this._taskOdoo.newTask(this.task);


   /*  53338707 */
    
          //time =  this.reloj.getHours().toString()+ ":"+ this.reloj.getMinutes().toString() + ":" + this.reloj.getSeconds().toString() 
       //this.task.time = '12:12:12';
    // this.task.date = '2020-02-20'
   // this.task.date = this.date.transform(this.fecha, 'yyyy-MM-dd');
   // this.task.time = this.date.transform(this.reloj, 'HH:mm:ss');
//this.task.date = this.fecha.getFullYear().toString() + "-" + (this.fecha.getMonth() +1).toString() + "-" +this.fecha.getDate().toString()
     //console.log("Vet",this.fecha.getDay+"-"+this.fecha.getFullYear().toString() + "-" + (this.fecha.getMonth() +1).toString() + "-" +this.fecha.getDate().toString());
    /* 
    this.task.address.latitude="4.44";
    this.task.address.longitude="4.43"; */
    // this.task.title= 'Arreglo'
    
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
  }
}

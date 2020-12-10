import { Component, NgZone, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { TaskOdooService } from 'src/app/services/task-odoo.service';
import { Address, TaskModel } from '../../models/task.model';

//-----------------------------------------------
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Photo,PhotoService } from '../../services/photo.service';

import { NgCalendarModule  } from 'ionic2-calendar';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nueva-solicitud',
  templateUrl: './nueva-solicitud.page.html',
  styleUrls: ['./nueva-solicitud.page.scss'],
})
export class NuevaSolicitudPage implements OnInit {
  titulo:String="";
  checkSi:boolean=false;
  checkNo:boolean=false; 

  notificationNewSoClient$: Observable<boolean>;
  notificationError$: Observable<boolean>;
  
  calle:string="";
  piso:string="";
  numero:string="";
  puerta:string="";
  portal:string="";
  cod_postal:string="";
  escalera:string="";

servicio:string="";

  comentario:string="";

  task:TaskModel;

  longuitud:number;
  latitud:number;

  viewTitle;
  fecha:Date ;
  reloj:Date;

  
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  }


  constructor(private datos:ObtSubSService,
              private _taskOdoo: TaskOdooService,
              private ngZone: NgZone,
              public navCtrl:NavController,
              public photoService: PhotoService, 
              public actionSheetController: ActionSheetController,
              public alertController: AlertController,
              public calen:NgCalendarModule,
              private route:Router) { 

                this.fecha =new Date();
this.reloj=new Date();

               
   
  }

  async ngOnInit() {

this.servicio=this.datos.getServ();

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
          this.route.navigate(["/tabs/tab1"]);

        }

      });

    });
//-----------------------
await this.photoService.loadSaved();
  }

  checkSiF(){
    if(this.checkSi)
    {
     
      
      this.datos.setUtiles(this.checkSi);
      console.log("no lo toque",this.checkSi)
    }
   
    else
    {
      
      
     this.datos.setUtiles(this.checkSi);
     console.log("si lo toque",this.checkSi)
     this.checkNo=false;
    }
   
   
   
  }
  checkNoF(){
    if(this.checkNo)
    {
     
      
      this.datos.setUtiles(this.checkNo);
      console.log("no lo toque",this.checkSi)
    }
   
    else
    {
      
      
     this.datos.setUtiles(this.checkNo);
     console.log("si lo toque",this.checkSi)
     this.checkSi=false;
    }
   
   
   
  }

  crearSolicitud(){
   this.task=new TaskModel();
   this.task.address=new Address();

this.datos.setUtiles(this.checkSi);
this.datos.setcomentario(this.comentario);
this.datos.setcalle(this.calle);
this.datos.setpuerta(this.puerta);
this.datos.setpiso(this.piso);
this.datos.setescalera(this.escalera);
this.datos.setcod_postal(this.cod_postal);
this.datos.setnumero(this.numero);
this.datos.setportal(this.portal);



    this.task.require_materials=this.datos.getUtiles();
    this.task.description=this.datos.getcomentario();

    this.task.address.street=this.datos.getcalle();
    this.task.address.door=this.datos.getpuerta();
    this.task.address.stair=this.datos.getescalera();
    this.task.address.portal=this.datos.getportal();
    this.task.address.cp=this.datos.getcod_postal();
    this.task.address.number=this.datos.getnumero();
    this.task.address.floor=this.datos.getpiso();

    this.task.title= 'Arreglo'
    this.task.product_id = 39;
    this.task.type = ':Servicio de Fontaneria';
    //this.task.time = '12:12:12';
    //this.task.date = '2020-02-20'
  this.task.time =  this.reloj.getHours().toString()+ ":"+ this.reloj.getMinutes().toString() + ":" + this.reloj.getSeconds().toString() 
    
   this.task.date = this.fecha.getFullYear().toString() + "-" + (this.fecha.getMonth() +1).toString() + "-" +this.fecha.getDate().toString()
    //console.log("Vet",this.task.date);
    
    this._taskOdoo.newTask(this.task);

  }
 
//-------------------------------
public async showActionSheet(photo: Photo, position: number) {
  const actionSheet = await this.actionSheetController.create({
    header: 'Photos',
    buttons: [{
      text: 'Delete',
      role: 'destructive',
      icon: 'trash',
      handler: () => {
        this.photoService.deletePicture(photo, position);
      }
    }, {
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        // Nothing to do, action sheet is automatically closed
       }
    }]
  });
  await actionSheet.present();
}

async presentAlertConfirm() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: '¿Desea colocar una foto?',
    message: 'Selecione la opcion de camara o galeria para la foto ',
    buttons: [
     
      {
        text: 'Camara',
        
        handler: () => {
          this.photoService.photos=[];
          this.photoService.addNewToCamara();
       }
      },
      {
        text: 'Galeria',
        handler: () => {
          this.photoService.photos=[];
          this.photoService.addNewToGallery();
       }
      },
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }
      
    ]
  });

  await alert.present();
}

onViewTitleChanged(title) {
  this.viewTitle = title;

 // console.log(this.calendar.currentDate);
}

onCurrentDateChanged(event){
  
  this.fecha=event;
  
 //this.dia= this.fecha.getDate().toString();
  }


reloadSource(startTime, endTime){

  console.log("Ver1",startTime);
  console.log("Ver2",endTime);

}

}
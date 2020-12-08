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

@Component({
  selector: 'app-nueva-solicitud',
  templateUrl: './nueva-solicitud.page.html',
  styleUrls: ['./nueva-solicitud.page.scss'],
})
export class NuevaSolicitudPage implements OnInit {

  checkSi:boolean=false;
  checkNo:boolean=false; 
  
  calle:string="";
  piso:string="";
  numero:string="";
  puerta:string="";
  portal:string="";
  cod_postal:string="";
  escalera:string="";


  comentario:string="";

  task:TaskModel;

  longuitud:number;
  latitud:number;

  viewTitle;
  fecha:Date ;

  dia:string;
  
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
              public calen:NgCalendarModule) { 

                this.fecha =new Date();


               
   
  }

  async ngOnInit() {
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

    this.task.title= 'Arreglo de llave'
    this.task.product_id = 39;
    this.task.type = ':Servicio de Fontaneria';
    this.task.date = '07:30:30';
   //this.task.time = '2020-2-20'
   
   this.task.time = this.fecha.getFullYear().toString() + "-" + (this.fecha.getMonth() +1).toString() + "-" +this.fecha.getDate().toString()
    console.log("Vet",this.task.time);
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
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Galeria',
        handler: () => {
          this.photoService.photos=[];
          this.photoService.addNewToGallery();
    
       
          
        }
      },
      {
        text: 'Camara',
        
        handler: () => {
          this.photoService.photos=[];
          this.photoService.addNewToCamara();
       
          
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
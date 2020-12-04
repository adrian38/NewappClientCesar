import { Component, NgZone, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { TaskOdooService } from 'src/app/services/task-odoo.service';
import { Address, TaskModel } from '../../models/task.model';

//-----------------------------------------------
import { ActionSheetController } from '@ionic/angular';

import { Photo,PhotoService } from '../../services/photo.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
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

  constructor(private datos:ObtSubSService,
              private _taskOdoo: TaskOdooService,
              private ngZone: NgZone,
              public navCtrl:NavController,
              public photoService: PhotoService, 
              public actionSheetController: ActionSheetController,
              private geolocation: Geolocation) { 


               
   
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
    this.task.time = '2020-10-20'

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

localizacion(){
  console.log("mi ubicacion");
  this.geolocation.getCurrentPosition().then((resp) => {
    
    this.latitud = resp.coords.latitude;
    this.longuitud=resp.coords.longitude;

   /*   console.log("latitud",resp.coords.latitude);
     console.log("longitus",resp.coords.longitude); */
     
    
   }).catch((error) => {
     console.log('Error getting location', error);
   });

}

}
import { Component, NgZone, OnInit } from '@angular/core';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { TaskOdooService } from 'src/app/services/task-odoo.service';
import { Address, TaskModel } from '../../models/task.model';

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

  constructor(private datos:ObtSubSService,
              private _taskOdoo: TaskOdooService,
              private ngZone: NgZone) { 
   
  }

  ngOnInit() {

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


//this.task.require_materials= !this.checkSi; 
/* this.task.description =this.comentario;
this.task.address.street=this.calle;
this.task.address.door=this.puerta;
this.task.address.floor=this.piso;
this.task.address.number=this.numero;
this.task.address.portal=this.portal;
this.task.address.stair=this.escalera; */

   


  }

}
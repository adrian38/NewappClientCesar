import { Component, OnInit } from '@angular/core';
import { Address, TaskModel } from 'src/app/models/task.model';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { TaskOdooService } from 'src/app/services/task-odoo.service';


@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.page.html',
  styleUrls: ['./direccion.page.scss'],
})
export class DireccionPage implements OnInit {
  
  
  calle:string="";
  piso:string="";
  numero:string="";
  puerta:string="";
  portal:string="";
  cod_postal:string="";
  escalera:string="";
  task:TaskModel;

  constructor(private _taskOdoo: TaskOdooService) {
   
    this.task = this._taskOdoo.getTaskCesar();
   
   }

  ngOnInit() {
  }

onclick(){
  this.task.address = new Address(this.calle['address']['calle'],
  this.numero['address']['numero'],
  this.portal['address']['portal'],
  this.escalera['address']['escalera'],
  this.piso['address']['piso'],
  this.puerta['address']['puerta'],
  this.cod_postal['address']['cp'],
  'latitude',
  'longitude');

  this._taskOdoo.setTaskCesar(this.task);


}

}

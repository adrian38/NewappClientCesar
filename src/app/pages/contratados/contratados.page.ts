import { Component, OnInit } from '@angular/core';
import { TaskModel } from 'src/app/models/task.model';
import { TaskOdooService } from 'src/app/services/task-odoo.service';

@Component({
  selector: 'app-contratados',
  templateUrl: './contratados.page.html',
  styleUrls: ['./contratados.page.scss'],
})
export class ContratadosPage implements OnInit {


  task: TaskModel;
  displayClasificar:boolean=false;

  constructor( private _taskOdoo:TaskOdooService) { }

  ngOnInit() {

    this.task=new TaskModel();
    this.task=this._taskOdoo.getTaskCesar();
    
   
    this._taskOdoo.requestOffersForTask(this.task.id_string);
   
  }

  clasificar(){
    this.displayClasificar=true;
  }

  denunciar(){

  }
punto(){
  console.log("estrella");
}
}

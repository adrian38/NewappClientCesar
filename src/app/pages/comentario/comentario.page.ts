import { Component, OnInit } from '@angular/core';
import { TaskModel } from 'src/app/models/task.model';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { TaskOdooService } from 'src/app/services/task-odoo.service';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.page.html',
  styleUrls: ['./comentario.page.scss'],
})
export class ComentarioPage implements OnInit {

  task:TaskModel
  private comentario:string="";
  constructor(private _taskOdoo: TaskOdooService) {
   
    this.task = this._taskOdoo.getTaskCesar();
   
   }
  ngOnInit() {
  }
  onclick(){
 
    this.task.description=this.comentario;
    this._taskOdoo.setTaskCesar(this.task);
  }

}

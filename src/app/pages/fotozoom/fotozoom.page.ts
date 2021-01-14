import { Component, OnInit } from '@angular/core';
import { TaskModel } from 'src/app/models/task.model';
import { AuthOdooService } from 'src/app/services/auth-odoo.service';
import { TaskOdooService } from 'src/app/services/task-odoo.service';

@Component({
  selector: 'app-fotozoom',
  templateUrl: './fotozoom.page.html',
  styleUrls: ['./fotozoom.page.scss'],
})
export class FotozoomPage implements OnInit {
  task:TaskModel
  constructor(  private _taskOdoo:TaskOdooService) { 
   
    this.task=new TaskModel();
    this.task=this._taskOdoo.getTaskCesar();
  }

  ngOnInit() {
  }

}

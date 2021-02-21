import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { Photo } from 'src/app/interfaces/photo';
import { TaskModel } from 'src/app/models/task.model';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { PhotoService } from 'src/app/services/photo.service';
import { TaskOdooService } from 'src/app/services/task-odoo.service';

@Component({
  selector: 'app-histdetalle',
  templateUrl: './histdetalle.page.html',
  styleUrls: ['./histdetalle.page.scss'],
})
export class HistdetallePage implements OnInit {
  
  task: TaskModel;
  constructor(private _taskOdoo:TaskOdooService,
    public photoService: PhotoService,
    public alertController: AlertController,
    public navCtrl:NavController,
    private platform: Platform,
    private subServ: ObtSubSService) { }

  ngOnInit() {
    this.task=new TaskModel();
    this.task=this._taskOdoo.getTaskCesar();
  }

}

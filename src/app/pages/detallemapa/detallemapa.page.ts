import { Component, OnInit } from '@angular/core';
import { TaskModel } from 'src/app/models/task.model';
import { TaskOdooService } from 'src/app/services/task-odoo.service';
import { Marcador } from 'src/app/models/marcador.class';
import { NavController, Platform } from '@ionic/angular';
@Component({
  selector: 'app-detallemapa',
  templateUrl: './detallemapa.page.html',
  styleUrls: ['./detallemapa.page.scss'],
})
export class DetallemapaPage implements OnInit {

  lat :number;
  lng :number;
  task:TaskModel;
  marcadores: Marcador[] = [];

  constructor(private _taskOdoo:TaskOdooService,
    private platform: Platform,
    public navCtrl:NavController) { 

 this.task=new TaskModel();
 this.task=this._taskOdoo.getTaskCesar();

 this.platform.backButton.subscribeWithPriority(10, () => {
  this.navCtrl.navigateRoot('/ofertas ', {animated: true, animationDirection: 'back' }) ;
});
 
  }

  ngOnInit() {

    this.lat=Number(this.task.address.latitude);
    this.lng=Number(this.task.address.longitude);
    const nuevoMarcador = new Marcador( this.lat, this.lng );

    this.marcadores.push( nuevoMarcador ); 
  }

}

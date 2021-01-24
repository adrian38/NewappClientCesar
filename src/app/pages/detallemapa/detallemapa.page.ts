import { Component, OnInit } from '@angular/core';
import { TaskModel } from 'src/app/models/task.model';
import { TaskOdooService } from 'src/app/services/task-odoo.service';
import { Marcador } from 'src/app/models/marcador.class';
import { NavController, Platform } from '@ionic/angular';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
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
  ruta:string="";

  constructor(private _taskOdoo:TaskOdooService,
    private platform: Platform,
    public navCtrl:NavController,
    private datos:ObtSubSService) { 

 this.task=new TaskModel();
 this.task=this._taskOdoo.getTaskCesar();


  }

  ngOnInit() {
 
    this.ruta=this.datos.getruta();
    console.log("ruta",this.ruta);

    
      this.platform.backButton.subscribeWithPriority(10, () => {
        if(this.ruta=="/ofertas")
        {
        this.navCtrl.navigateRoot('ofertas', {animated: true, animationDirection: 'back' }) ;
      }
      else{
    
        this.navCtrl.navigateRoot('contratados', {animated: true, animationDirection: 'back' }) ;
    

      }
        }); 
    
    
 





    this.lat=Number(this.task.address.latitude);
    this.lng=Number(this.task.address.longitude);
    const nuevoMarcador = new Marcador( this.lat, this.lng );

    this.marcadores.push( nuevoMarcador ); 
  }

}

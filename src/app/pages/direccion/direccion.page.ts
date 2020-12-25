import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Address, TaskModel } from 'src/app/models/task.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
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
  servicio:string="";

  dpcalle:string;

  user:UsuarioModel;
  task:TaskModel;

  constructor(private datos:ObtSubSService,
    public navCtrl:NavController,
    private platform: Platform) { 

      this.platform.backButton.subscribeWithPriority(10, () => {
        this.navCtrl.navigateRoot('/horario', {animated: true, animationDirection: 'back' }) ;
          
        });

    }

  ngOnInit() {
    this.servicio=this.datos.getServ();
    /* this.task=this._taskOdoo.getTaskCesar();
    console.log(this.task); */
  }
  cerrarsolicitud(){
    this.navCtrl.navigateRoot('/tabs/tab1', {animated: true, animationDirection: 'forward' }) ;
      
  
  }
  goto(){
   



this.datos.setcalle(this.calle);
this.datos.setpuerta(this.puerta);
this.datos.setpiso(this.piso);
this.datos.setescalera(this.escalera);
this.datos.setcod_postal(this.cod_postal);
this.datos.setnumero(this.numero);
this.datos.setportal(this.portal);


    this.navCtrl.navigateRoot('/comentario', {animated: true, animationDirection: 'forward' }) ;
     
  }
  direcPer(){
    
this.datos.setcalle(this.task.address.street);
this.dpcalle=this.task.address.street;


  }
}

import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Address, TaskModel } from 'src/app/models/task.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { TaskOdooService } from 'src/app/services/task-odoo.service';
import { AuthOdooService } from 'src/app/services/auth-odoo.service';
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
  dppiso:string="";
  dpnumero:string="";
  dppuerta:string="";
  dpportal:string="";
  dpcod_postal:string="";
  dpescalera:string="";
  dpservicio:string="";

  coordenadas:boolean;

  Autofill:boolean=false;
  

  user:UsuarioModel;
  task:TaskModel;

  constructor(private datos:ObtSubSService,
    public navCtrl:NavController,
    private platform: Platform,
    private _authOdoo: AuthOdooService) { 

      this.coordenadas=this.datos.getcoordenada();

      this.platform.backButton.subscribeWithPriority(10, () => {
        this.navCtrl.navigateRoot('/horario', {animated: true, animationDirection: 'back' }) ;
          
        });

      
    }

    

  ngOnInit() {
    
  
    this.servicio=this.datos.getServ();
    this.user = this._authOdoo.getUser();
    console.log(this.user); 
    
/*     this.dplat=String(this.datos.getlatitud());
    this.dplng=String(this.datos.getlongitud()); */
 /*    console.log("1",this.dplat);
    console.log("1",this.dplng); */
   
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

 autofillChange(){
   console.log("si");

if (this.Autofill) {
  for (let value in this.user.address) {
    if (!this.user.address[value])
      this.user.address[value] = '';
  }
  
  console.log(this.user);
 /*  this.calle=this.user.address.street;
  this.puerta=this.user.address.door;
  this.cod_postal=this.user.address.cp;
  this.escalera=this.user.address.stair;
  this.piso=this.user.address.floor;
  this.numero=this.user.address.number;
  this.portal=this.user.address.portal; */
  console.log("autofillsi",this.Autofill);
  
}
else{
  console.log("vacio");
  this.dpcalle="";
  this.puerta="";
  this.cod_postal="";
  this.escalera="";
  this.piso="";
  this.numero="";
  this.portal="";
  console.log("autofillno",this.Autofill);
}
}

ubicacion(){
  
  this.navCtrl.navigateRoot('/mapa', {animated: true, animationDirection: 'back' }) ;
      
}

ver(){
  this.coordenadas=true;
}
 }



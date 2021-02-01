import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Address, UsuarioModel } from 'src/app/models/usuario.model';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { SignUpOdooService } from 'src/app/services/signup-odoo.service';

@Component({
  selector: 'app-aceptarregistro',
  templateUrl: './aceptarregistro.page.html',
  styleUrls: ['./aceptarregistro.page.scss'],
})
export class AceptarregistroPage implements OnInit {
  
   aceptar:boolean=true;

   usuario:UsuarioModel;
   address:Address;

  constructor(public datos:ObtSubSService,
              private _signupOdoo: SignUpOdooService,
              private platform: Platform,
              public navCtrl:NavController) { }

  ngOnInit() {

    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot('/registro', {animated: true, animationDirection: 'back' }) ;
        
      });
  }
  condiciones(){
    if(this.aceptar==true)
this.aceptar=false;
else
this.aceptar=true;
  }

  aceptarregistro(){
    this.usuario = new UsuarioModel;
    this.usuario.address=new Address('','','','','','','','','');
    this.usuario.realname=this.datos.getnombre();
    this.usuario.password=this.datos.getcontraseña();
    this.usuario.phone=this.datos.gettelefono();
    this.usuario.username =this.datos.getcorreo();
    this.usuario.date =this.datos.getfecha();
   /*  this.usuario.date='2020-02-20'; */
    this.usuario.type = 'client';
    
    this.usuario.address.street=this.datos.getcalle(); 
    this.usuario.address.door=this.datos.getpuerta();
    this.usuario.address.stair=this.datos.getescalera();
    this.usuario.address.portal=this.datos.getportal();
    this.usuario.address.cp=this.datos.getcod_postal();
    this.usuario.address.number=this.datos.getnumero();
    this.usuario.address.floor=this.datos.getpiso();

    this.usuario.address.latitude=String(this.datos.getlatitud());
    this.usuario.address.longitude=String(this.datos.getlongitud());
    this.usuario.avatar = this.datos.getfoto0();

    /*  console.log(this.usuario,"nuevo usuario"); */

     console.log("registrono",this.datos.getnombre());
     console.log("contr",this.datos.getcontraseña());
     console.log("tele",this.datos.gettelefono());
     console.log("corr",this.datos.getcorreo());
     console.log("fec",this.datos.getfecha());

     console.log("call",this.datos.getcalle());
     console.log("puer",this.datos.getpuerta());
     console.log("esc",this.datos.getescalera());
     console.log("port",this.datos.getportal());
     console.log("cposta",this.datos.getcod_postal());
     console.log("nume",this.datos.getnumero());
     console.log("pis",this.datos.getpiso());
     



    
this.limpiar_campos();

   /*  this._signupOdoo.newUser(this.usuario);  */

   this.navCtrl.navigateRoot('/inicio', {animated: true, animationDirection: 'back' }) ;
        
  }

  limpiar_campos(){
    this.datos.setnombre("");
    /* console.log("registronombre",this.nombre); */
      this.datos.setcorreo("");
     this.datos.setcontraseña("");
      
     this.datos.settelefono("");
     
     this.datos.setcalle("");
     this.datos.setpiso("");
     this.datos.setnumero("");
     this.datos.setpuerta("");
     this.datos.setportal("");
     this.datos.setcod_postal("");
     this.datos.setescalera("");
     this.datos.setfoto0("");
  }
}

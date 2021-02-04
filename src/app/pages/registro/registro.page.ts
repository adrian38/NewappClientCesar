import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import {AvatarModule} from 'primeng/avatar';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { Address } from '../../models/task.model';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { SignUpOdooService } from 'src/app/services/signup-odoo.service';
import { DatePipe } from '@angular/common';
import { Photo } from 'src/app/interfaces/photo';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

 imgResultBeforeCompress:string;
 imgResultAfterCompress:string;

 verFoto:boolean=false;
 verFotoInicial:boolean=true;

 usuario:UsuarioModel;
 address:Address;

 nombre:string="";
 fecha:string="";
 correo:string="";
 pass:string="";
 telefono:number;
 calle:string="";
 piso:string="";
 numero:string="";
 puerta:string="";
 portal:string="";
 cod_postal:string="";
 escalera:string="";
 fechactual:string="";
 avatarusuario =  '../../../assets/fotoadd.png';
 avatarusuario64:string="";
 calen:boolean=false;


 
  constructor(public photoService: PhotoService,
              public datos:ObtSubSService,
              public navCtrl:NavController, 
              public alertController: AlertController,
              private _signupOdoo: SignUpOdooService,
              private platform: Platform)
               {
                 
                }

  ngOnInit() {

    this.obtener_campos();
   

    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot('/inicio', {animated: true, animationDirection: 'back' }) ;
        
      });

  }


  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '¿Desea colocar una foto?',
      message: 'Selecione la opcion de camara o galeria para la foto ',
      buttons: [
        
        {
          text: 'Camara',
          
          handler:  async () => {
          /*   this.photoService.photos=[];
            this.verFoto=true;
            this.verFotoInicial=false;
            this.photoService.addNewToCamara();
           this.avatarusuario= this.photoService.devuelve64();
            console.log(this.avatarusuario); */
            let photo: Photo = await this.photoService.addNewToCamara();
            console.log( "Foto",photo.webviewPath);
            if(photo){
              this.avatarusuario= photo.webviewPath;
              console.log(this.avatarusuario);
              this.avatarusuario64= this.photoService.devuelve64();
             
            
             
            }
            
          }
        },{
          text: 'Galeria',
          handler:async  () => {
             
            this.photoService.photos = [];     
            let photos: Photo[] = await this.photoService.addNewToGallery();
            console.log("Fotos",JSON.stringify(this.photoService.photos));

            if(photos.length == 1){
              
              this.avatarusuario= photos[0].webviewPath;
              console.log(this.avatarusuario);
              this.avatarusuario64= this.photoService.devuelve64(); 
             
            
             
            }
            
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          /*   this.verFoto=false;
            this.verFotoInicial=true; */
            this.avatarusuario = '../../../assets/fotoadd.png';
            this.avatarusuario64="";
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });

    await alert.present();
  }


  iniciar(){

  this.entrar_campos();


    this.fechactual = new Date().getFullYear().toString();
    console.log("completa", this.fecha);
     let fechalarga=this.fecha.slice(0,10);
     let fechacorta=this.fecha.slice(0,4);
     console.log("fechalarga", fechalarga);
    console.log("fechacorta", fechacorta);
    let fechavalida=Number(this.fechactual) - Number(fechacorta);
    console.log("fechavalida", fechavalida);
   /* this.usuario = new UsuarioModel;
    this.usuario.address=new Address('','','','','','','','','');

             */
 if(fechavalida > 17){ 
  this.calen=false;
  this.datos.setfecha(fechalarga);
  this.navCtrl.navigateRoot('/aceptarregistro', {animated: true, animationDirection: 'forward' }) ; 
 }
 else{
  console.log("no  entro");
  this.calen=true;

 }


 /* 
this.usuario.realname=this.nombre;
this.usuario.password=this.pass;
this.usuario.phone=this.telefono;
this.usuario.username =this.correo;
this.usuario.date='2020-02-20';
this.usuario.type = 'client';
    
    this.usuario.address.street=this.calle; 
    this.usuario.address.door=this.puerta;
    this.usuario.address.stair=this.escalera;
    this.usuario.address.portal=this.portal;
    this.usuario.address.cp=this.cod_postal;
    this.usuario.address.number=this.numero;
    this.usuario.address.floor=this.piso;

    this.usuario.address.latitude="4";
    this.usuario.address.longitude="4";
    this.usuario.avatar = this.avatarusuario64;
    
    
    */
 
    /* this.usuario.avatar = "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"
  */
    //console.log(this.usuario,"nuevo usuario");

   //  this._signupOdoo.newUser(this.usuario); 



  }

  ubicacion(){
    console.log("entre a maparegistro")
    this.entrar_campos();
    
      this.navCtrl.navigateRoot('/regismapa', {animated: true, animationDirection: 'forward' }) ;
      
     
  }
  entrar_campos(){
    this.datos.setnombre(this.nombre);
    /* console.log("registronombre",this.nombre); */
      this.datos.setcorreo(this.correo);
     this.datos.setcontraseña(this.pass);
      
     this.datos.settelefono(this.telefono);
     
     this.datos.setcalle(this.calle);
     this.datos.setpiso(this.piso);
     this.datos.setnumero(this.numero);
     this.datos.setpuerta(this.puerta);
     this.datos.setportal(this.portal);
     this.datos.setescalera(this.escalera);
     this.datos.setcod_postal(this.cod_postal); 
     this.datos.setfoto0(this.avatarusuario64);
  }

  obtener_campos(){
    this.nombre=this.datos.getnombre();
    this.correo=this.datos.getcorreo();
    this.pass=this.datos.getcontraseña();
    this.telefono=this.datos.gettelefono();
    this.calle=this.datos.getcalle();
    this.numero=this.datos.getnumero();
    this.piso=this.datos.getpiso();
    this.puerta=this.datos.getpuerta();
    this.portal=this.datos.getportal();
    this.escalera=this.datos.getescalera();
    this.cod_postal=this.datos.getcod_postal();
  }
}
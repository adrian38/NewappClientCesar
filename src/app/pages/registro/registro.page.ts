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
 ppass:string="";
 telefono:number;
 calle:string="";
 piso:string="";
 numero:string="";
 puerta:string="";
 portal:string="";
 cod_postal:string="";
 escalera:string="";
 fechactual:string="";
 avatarusuario = "";
 avatarusuario64:string="";
 calen:boolean=false;
 selectFoto:boolean=false;
 coordenadas:boolean=false;
 ccontra:boolean=false;


 
  constructor(public photoService: PhotoService,
              public datos:ObtSubSService,
              public navCtrl:NavController, 
              public alertController: AlertController,
              private platform: Platform)
               {
    this.coordenadas=this.datos.getcoordenada();             
    console.log("co",this.coordenadas);
    this.selectFoto=this.datos.getselectfoto();
    console.log("fo",this.selectFoto);
                 
                }

  ngOnInit() {

    
    this.obtener_campos();
   

    this.platform.backButton.subscribeWithPriority(10, () => {
     this.alert_atras()
     
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
              /* this.selectFoto=true; */
              this.datos.setselectfoto(true);
              //console.log("foto",this.selectFoto);
             
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
              this.selectFoto=true;
              console.log("foto",this.selectFoto);
              this.datos.setselectfoto(true);
             
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
            this.avatarusuario = '../../../assets/registro.svg';
            this.avatarusuario64="";
            console.log('Confirm Cancel: blah');
            this.selectFoto=false;
            console.log("foto",this.selectFoto);
            this.datos.setselectfoto(false);
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
   console.log("1",this.pass)
   console.log("2",this.ppass)
   if(this.pass==this.ppass){
    this.calen=false;
    this.ccontra=false;
    this.datos.setfecha(fechalarga);
     this.navCtrl.navigateRoot('/aceptarregistro', {animated: true, animationDirection: 'forward' }) ;
   }
   else
   console.log("no  entro por contraseña");
   this.calen=false;
   this.ccontra=true;
 }
 else{
  console.log("no  entro por fecha");
  this.calen=true;
   this.ccontra=false;
 }




  }

  ubicacion(){
    console.log("entre a maparegistro")
    this.entrar_campos();

    this.datos.setruta("registro");

    this.navCtrl.navigateRoot('/regismapa', {animated: true, animationDirection: 'forward' }) ;
      
     
  }
  entrar_campos(){
    this.datos.setnombre(this.nombre.trim());
    /* console.log("registronombre",this.nombre); */
      this.datos.setcorreo(this.correo.trim().toLowerCase());
     this.datos.setcontraseña(this.pass);
     this.datos.setcontraseñaConfirmafa(this.ppass);
     this.datos.settelefono(this.telefono);
     
     this.datos.setcalle(this.calle.trim());
     this.datos.setpiso(this.piso);
     this.datos.setnumero(this.numero);
     this.datos.setpuerta(this.puerta);
     this.datos.setportal(this.portal);
     this.datos.setescalera(this.escalera);
     this.datos.setcod_postal(this.cod_postal); 
     this.datos.setfoto0(this.avatarusuario64);
     this.datos.setfotoRegis(this.avatarusuario);
     this.datos.setfecha(this.fecha);
  }

  obtener_campos(){
    this.nombre=this.datos.getnombre().trim();
    console.log(this.nombre)
    this.correo=this.datos.getcorreo();
    this.correo=this.correo.toLowerCase().trim();
    console.log(this.correo)
    this.pass=this.datos.getcontraseña();
    this.ppass=this.datos.getcontraseñaConfirmafa();
    this.telefono=this.datos.gettelefono();
    this.calle=this.datos.getcalle().trim();
    this.numero=this.datos.getnumero();
    this.piso=this.datos.getpiso();
    this.puerta=this.datos.getpuerta();
    this.portal=this.datos.getportal();
    this.escalera=this.datos.getescalera();
    this.cod_postal=this.datos.getcod_postal();
    this.coordenadas=this.datos.getcoordenada();
    this.avatarusuario=this.datos.getfotoRegis();
    this.fecha=this.datos.getfecha();
    this.selectFoto=this.datos.getselectfoto();
  }
  vaciar_campos(){
    this.datos.setnombre("");
    /* console.log("registronombre",this.nombre); */
      this.datos.setcorreo("");
     this.datos.setcontraseña("");
     this.datos.setcontraseñaConfirmafa("");
     this.datos.settelefono("");
     
     this.datos.setcalle("");
     this.datos.setpiso("");
     this.datos.setnumero("");
     this.datos.setpuerta("");
     this.datos.setportal("");
     this.datos.setescalera("");
     this.datos.setcod_postal(""); 
     this.datos.setfoto0("");
     this.datos.setfoto1("");
     this.datos.setfecha("");
  }

  async alert_atras() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message: 'Perdera toda los datos',
     
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          handler: (datos) => {
  
  
  
            this.vaciar_campos();
      this.navCtrl.navigateRoot('/inicio', {animated: true, animationDirection: 'back' }) ;
        
          }
        }
      ]
    });
  
    await alert.present();
  } 
}
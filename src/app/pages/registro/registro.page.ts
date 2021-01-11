import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';

import { AlertController, NavController, Platform } from '@ionic/angular';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
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

 nombre:string="";
 correo:string="";
 pass:string="";
 telefono:string="";
 calle:string="";
 piso:string="";
 numero:string="";
 puerta:string="";
 portal:string="";
 cod_postal:string="";
 escalera:string="";

  constructor(public photoService: PhotoService,
              public datos:ObtSubSService, 
               public alertController: AlertController,
               public navCtrl:NavController) 
               {

                this.usuario = new UsuarioModel;

                }

  ngOnInit() {
  }



  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '¿Desea colocar una foto?',
      message: 'Selecione la opcion de camara o galeria para la foto ',
      buttons: [
        
        {
          text: 'Camara',
          
          handler: () => {
            this.photoService.photos=[];
            this.verFoto=true;
            this.verFotoInicial=false;
            this.photoService.addNewToCamara();
         
            
          }
        },{
          text: 'Galeria',
          handler: () => {
            this.photoService.photos=[];
            this.verFoto=true;
            this.verFotoInicial=false;
            this.photoService.addNewToGallery();
           
         
            
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.verFoto=false;
            this.verFotoInicial=true;
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });

    await alert.present();
  }

  iniciar(){


this.datos.setnombre(this.nombre);
this.datos.settelefono(this.telefono);
this.datos.setcorreo(this.correo);
this.datos.setcontraseña(this.pass);
this.datos.setpiso(this.piso);
this.datos.setnumero(this.numero);
this.datos.setpuerta(this.puerta);
this.datos.setportal(this.portal);
this.datos.setcod_postal(this.cod_postal);
this.datos.setescalera(this.escalera);


  }

  ubicacion(){
    console.log("entre a maparegistro")
    
      this.navCtrl.navigateRoot('/regismapa', {animated: true, animationDirection: 'forward' }) ;
      
     
  }
}

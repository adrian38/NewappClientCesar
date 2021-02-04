import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { Photo } from 'src/app/interfaces/photo';
import { Address, UsuarioModel } from 'src/app/models/usuario.model';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { PhotoService } from 'src/app/services/photo.service';
import { SignUpOdooService } from 'src/app/services/signup-odoo.service';

@Component({
  selector: 'app-datospersonales',
  templateUrl: './datospersonales.page.html',
  styleUrls: ['./datospersonales.page.scss'],
})
export class DatospersonalesPage implements OnInit {

  avatarusuario =  '../../../assets/fotoadd.png'

  usuario:UsuarioModel;
  address:Address;

 nombre:string="";
 fecha:string="";
 correo:string="";
 pass:string="";
 calle:string="";
 piso:string="";
 numero:string="";
 puerta:string="";
 portal:string="";
 cpostal:string="";
 escalera:string="";

 avatarusuario64:string="";

  constructor(public navCtrl:NavController,
               private platform: Platform,
               public datos:ObtSubSService,
               public alertController: AlertController,
               private _signupOdoo: SignUpOdooService,
               public photoService: PhotoService) { }

  ngOnInit() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot('/tabs/tab3', {animated: true, animationDirection: 'back' }) ;
        
      });
  }

  editar(){
    this.usuario = new UsuarioModel;
    this.usuario.address=new Address('','','','','','','','','');
    this.usuario.realname=this.nombre;
    this.usuario.password=this.pass;
    
    this.usuario.username =this.correo;
    
    this.usuario.type = 'client';
    
    this.usuario.address.street=this.calle; 
    this.usuario.address.door=this.puerta;
    this.usuario.address.stair=this.escalera;
    this.usuario.address.portal=this.portal;
    this.usuario.address.cp=this.cpostal;
    this.usuario.address.number=this.numero;
    this.usuario.address.floor=this.piso;
    this.usuario.avatar = this.avatarusuario64;

   /*  this.usuario.address.latitude=String(this.datos.getlatitud());
    this.usuario.address.longitude=String(this.datos.getlongitud());
 */

    /*  console.log(this.usuario,"nuevo usuario"); */

  this._signupOdoo.newUser(this.usuario);  
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
}

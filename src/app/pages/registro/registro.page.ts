import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';

import { AlertController } from '@ionic/angular';
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

  constructor(public photoService: PhotoService,
               
               public alertController: AlertController) { }

  ngOnInit() {
  }
/*   addPhotoToGallery() {

    
    this.ver=false;
     this.photoService.addNewToGallery();
  } */

 /*  camara(){
    console.log("camara");
    this.photoService.photos=[];
    this.photoService.addNewToCamara();
    this.compressFile();
  
    
  }

  
  galeria(){
    console.log("galeria");
    this.photoService.photos=[];
    this.photoService.addNewToGallery();
  } */
  
compressFile() {
  
   
    
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
}



import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';


//-----------------------------------------------
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Photo, PhotoService } from '../../services/photo.service';


@Component({
  selector: 'app-foto',
  templateUrl: './foto.page.html',
  styleUrls: ['./foto.page.scss'],
})
export class FotoPage implements OnInit {

  verFoto:boolean=false;
  verFotoInicial:boolean=true;

servicio:string="";
  constructor(private datos:ObtSubSService,
    public navCtrl:NavController,
    public photoService: PhotoService,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    private platform: Platform) {

      this.platform.backButton.subscribeWithPriority(10, () => {
        this.navCtrl.navigateRoot('/comentario', {animated: true, animationDirection: 'back' }) ;
          
        });
     }

  ngOnInit() {
    this.servicio=this.datos.getServ();
  }
  cerrarsolicitud(){
    this.navCtrl.navigateRoot('/tabs/tab1', {animated: true, animationDirection: 'forward' }) ;
      
  
  }
  goto(){
    this.navCtrl.navigateRoot('/resumen', {animated: true, animationDirection: 'forward' }) ;
     
  }

  public async showActionSheet(photo: Photo, position: number) {
    const actionSheet = await this.actionSheetController.create({
    header: 'Photos',
    buttons: [{
    text: 'Delete',
    role: 'destructive',
    icon: 'trash',
    handler: () => {
    this.photoService.deletePicture(photo, position);
    }
    }, {
    text: 'Cancel',
    icon: 'close',
    role: 'cancel',
    handler: () => {
    // Nothing to do, action sheet is automatically closed
    }
    }]
    });
    await actionSheet.present();
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
    },
    {
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

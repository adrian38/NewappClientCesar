import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';

//-----------------------------------------------
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { PhotoService } from '../../services/photo.service';
import { TaskOdooService } from 'src/app/services/task-odoo.service';
import { Photo } from 'src/app/interfaces/photo';


@Component({
  selector: 'app-foto',
  templateUrl: './foto.page.html',
  styleUrls: ['./foto.page.scss'],
})
export class FotoPage implements OnInit {

  foto0:string = '../../../assets/icon/noImage.svg';
  foto1:string = '../../../assets/icon/noImage.svg';

  //----------------------------------------------------------------
  servicio:string="Fotos del proyecto";

  constructor(private datos:ObtSubSService,
              public navCtrl:NavController,
              public photoService: PhotoService,
              public actionSheetController: ActionSheetController,
              public alertController: AlertController,
              private platform: Platform,
              private _taskOdoo: TaskOdooService) {
      this.platform.backButton.subscribeWithPriority(10, () => {
        this.navCtrl.navigateRoot('/comentario', {animated: true, animationDirection: 'back' }) ;
      });
  }

  ngOnInit() {
    // this.servicio=this.datos.getServ();
  }
  cerrarsolicitud(event){
    this.navCtrl.navigateRoot('/tabs/tab1', {animated: true, animationDirection: 'forward' });
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

  async presentAlertConfirm(posc:number) {
    console.log( "Foto", posc);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '¿Desea añadir una foto?',
      message: 'Selecione la opción de cámara o galería para la foto ',
      buttons: [{
        text: 'Cámara',            
        handler: async () => {
          if(posc==0){          
            let photo: Photo = await this.photoService.addNewToCamara();
            console.log( "Foto",photo.webviewPath);
            if(photo){
              this.foto0 = photo.webviewPath;
            }
          }    
          if(posc==1){             
            let photo: Photo = await this.photoService.addNewToCamara();            
            console.log( "Foto",photo.webviewPath);
            if(photo){
              this.foto1 = photo.webviewPath;
            }
          }
        }
      },
      {
        text: 'Galería',
        handler: async () => {  
          this.photoService.photos = [];     
          let photos: Photo[] = await this.photoService.addNewToGallery();
          console.log("Fotos",JSON.stringify(this.photoService.photos));
          if(photos.length == 1){
            if(posc==0){ 
              this.foto0 = photos[0].webviewPath;
            }
            if(posc==1){ 
              this.foto1 = photos[0].webviewPath;
            }            
          }
          if(photos.length > 1){
            this.foto0 = photos[1].webviewPath;
            this.foto1 = photos[0].webviewPath; //la primera del arreglo es la ultima seleccionada
          }
        }
      },
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }]
    });    
    await alert.present();
  }
}

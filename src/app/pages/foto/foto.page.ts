

import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';


//-----------------------------------------------
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Photo, PhotoService } from '../../services/photo.service';
import { TaskOdooService } from 'src/app/services/task-odoo.service';


@Component({
  selector: 'app-foto',
  templateUrl: './foto.page.html',
  styleUrls: ['./foto.page.scss'],
})
export class FotoPage implements OnInit {

  verFoto0:boolean;
  verFotoInicial0:boolean=true;
  
  verFoto1:boolean;
  verFotoInicial1:boolean=true;

  public f1: Photo[] = []; 
  //----------------------------------------------------------------


servicio:string="";
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
    
    async presentAlertConfirm(posc:number) {
    const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: '¿Desea colocar una foto?',
    message: 'Selecione la opcion de camara o galeria para la foto ',
    buttons: [
    
    {
    text: 'Camara',
    
    handler: () => {
    //  this.photoService.photos=[];
   if(posc==0)
   {
    //this.photoService.photos=[];
      
    this.verFoto0=true;
      this.verFotoInicial0=false;
    this.photoService.addNewToGallery();

   }
    

   if(posc==1)
   {
    //this.photoService.photos=[];
      
    this.verFoto1=true;
      this.verFotoInicial1=false;
    this.photoService.addNewToGallery();

   }
     
  
    
  
    
    }
    },
    {
    text: 'Galeria',
    handler: () => {
    this.photoService.photos=[];
      
   // this.verFoto=true;
    //  this.verFotoInicial=false;
    this.photoService.addNewToGallery();
    }
    },
    {
    text: 'Cancelar',
    role: 'cancel',
    cssClass: 'secondary',
    handler: (blah) => {
   // this.verFoto=false;
    //this.verFotoInicial=true;
    console.log('Confirm Cancel: blah');
    }
    }
    
    ]
    });
    
    await alert.present();
    }


   
}

import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';

//-----------------------------------------------

import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { PhotoService } from '../../services/photo.service';
import { TaskOdooService } from 'src/app/services/task-odoo.service';
import { Photo } from 'src/app/interfaces/photo';
import { TaskModel } from 'src/app/models/task.model';



@Component({
  selector: 'app-foto',
  templateUrl: './foto.page.html',
  styleUrls: ['./foto.page.scss'],
})
export class FotoPage implements OnInit {

 /*foto0:string = '../../../assets/icon/noImage.svg';
  foto1:string = '../../../assets/icon/noImage.svg';
  foto2:string = '../../../assets/icon/noImage.svg'; */
  /*foto0:string = '../../../assets/fotoadd.png'; */
  foto0:string = '';
  foto1:string = '';
  foto2:string = '';
  foto064:string = '';
  foto164:string = '';
  foto264:string = '';
  task:TaskModel;
  
  //----------------------------------------------------------------
  servicio:string="Fotos del proyecto";

  constructor(private datos:ObtSubSService,
              public navCtrl:NavController,
              public photoService: PhotoService,
              public actionSheetController: ActionSheetController,
              public alertController: AlertController,
              private platform: Platform,
              private _taskOdoo: TaskOdooService) {
/* 
    this.datos.setfoto00('../../../assets/fotoadd.png');
		this.datos.setfoto11('../../../assets/fotoadd.png');
		this.datos.setfoto22('../../../assets/fotoadd.png'); */
     
  }

  ngOnInit() {

    

    this.foto0=this.datos.getfoto00();
    this.foto1=this.datos.getfoto11();
    this.foto2=this.datos.getfoto22();  
    
    // this.servicio=this.datos.getServ();
 
    /* this.foto0="data:image/png;base64,"+this.datos.getfoto0(); */
    console.log("q1",this.foto0)
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot('/comentario', {animated: true, animationDirection: 'back' }) ;
    });
  }
  cerrarsolicitud(){
  
    this.presentAlert();
  }
  goto(){
 
    console.log("paso2",this.photoService.devuelve64());
   /*  this.task=new TaskModel();
    this.task.photoNewTaskArray[0]= this.photoService.devuelve64()
    console.log(this.photoService.loadSaved()); 
    console.log("resumen",this.photoService.devuelve64());
    console.log("serv creado",this.task); */
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
              this.datos.setfoto00(this.foto0);
              /* console.log(this.servicio); */
              this.foto064=this.photoService.devuelve64();
              this.datos.setfoto0(this.foto064);


             /*  console.log("paso..../",this.photoService.devuelve64()); */
              console.log("mi foto",this.foto0);
              console.log("mi foto 64",this.foto064);
             
            }
          }    
          if(posc==1){             
            let photo: Photo = await this.photoService.addNewToCamara();            
            console.log( "Foto",photo.webviewPath);
            if(photo){
              this.foto1 = photo.webviewPath;
              this.datos.setfoto11(this.foto1);
              this.foto164=this.photoService.devuelve64();
              this.datos.setfoto1(this.foto164);

            }
          }
          if(posc==2){             
            let photo: Photo = await this.photoService.addNewToCamara();            
            console.log( "Foto",photo.webviewPath);
            if(photo){
              this.foto2 = photo.webviewPath;
              this.datos.setfoto22(this.foto2);
              this.foto264=this.photoService.devuelve64();
              this.datos.setfoto2(this.foto264);
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
              this.datos.setfoto00(this.foto0);
              this.foto064=this.photoService.devuelve64();
              this.datos.setfoto0(this.foto064);

              console.log("paso..../",this.photoService.devuelve64());
              console.log("mi foto",this.foto0);
              
            }
            if(posc==1){ 
              this.foto1 = photos[0].webviewPath;
              this.datos.setfoto11(this.foto1);
              this.foto164=this.photoService.devuelve64();
              this.datos.setfoto1(this.foto164);
            }   
            if(posc==2){ 
              this.foto2 = photos[0].webviewPath;
              this.datos.setfoto22(this.foto2);
              this.foto264=this.photoService.devuelve64();
              this.datos.setfoto2(this.foto264);

            }          
          }
          if(photos.length > 1){
            this.foto0 = photos[2].webviewPath;
            this.foto1 = photos[1].webviewPath;
            this.foto2 = photos[0].webviewPath; //la primera del arreglo es la ultima seleccionada
          }
        }
      },
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
          this.foto0 = '../../../assets/icon/noImage.svg';
          this.foto1 = '../../../assets/icon/noImage.svg';
          this.foto2 = '../../../assets/icon/noImage.svg';
          
        }
      }]
    });    
    await alert.present();
  }

  
async presentAlert() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Alerta',
    message: 'Desea cancelar la solicitud',
   
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
          this.borrar_campos();
          this.navCtrl.navigateRoot('/tabs/tab1', {animated: true, animationDirection: 'forward' }) ;
    
        }
      }
    ]
  });

  await alert.present();
} 

borrar_campos(){

  this.datos.setTitulo("");

  this.datos.setcalle("");
  this.datos.setpuerta("");
  this.datos.setpiso("");
  this.datos.setescalera("");
  this.datos.setcod_postal("");
  this.datos.setnumero("");
  this.datos.setportal("");

  this.datos.setcomentario("");
  this.datos.setfoto00('../../../assets/fotoadd.png');
  this.datos.setfoto11('../../../assets/fotoadd.png');
  this.datos.setfoto22('../../../assets/fotoadd.png');  

  this.datos.setfoto0('');
  this.datos.setfoto1('');
  this.datos.setfoto2(''); 
}
}

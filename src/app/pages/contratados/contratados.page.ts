import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { Photo } from 'src/app/interfaces/photo';
import { TaskModel } from 'src/app/models/task.model';
import { PhotoService } from 'src/app/services/photo.service';
import { TaskOdooService } from 'src/app/services/task-odoo.service';

@Component({
  selector: 'app-contratados',
  templateUrl: './contratados.page.html',
  styleUrls: ['./contratados.page.scss'],
})
export class ContratadosPage implements OnInit {


  task: TaskModel;
  displayClasificar:boolean=false;
  displayDenunciar:boolean=false;
  foto0:string = '../../../assets/icon/noImage.svg';
  foto1:string = '../../../assets/icon/noImage.svg';
  foto2:string = '../../../assets/icon/noImage.svg';

  constructor( private _taskOdoo:TaskOdooService,
                public photoService: PhotoService,
                public alertController: AlertController,
                public navCtrl:NavController,
                private platform: Platform) { }

  ngOnInit() {

    this.task=new TaskModel();
    this.task=this._taskOdoo.getTaskCesar();
    
   
    this._taskOdoo.requestOffersForTask(this.task.id_string);

    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot('/ofertas', {animated: true, animationDirection: 'back' }) ;
        
      });
   
  }

  clasificar(){
    this.displayClasificar=true;
  }

  denunciar(){
    this.displayDenunciar=true;

  }
punto(){
  console.log("estrella");
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
           
            //this.datos.setfoto0(this.foto0);
            /* this.foto064=this.photoService.devuelve64();
            this.datos.setfoto0(this.foto064);
            console.log("paso..../",this.photoService.devuelve64());
            console.log("mi foto",this.foto0); */
           
          }
        }    
        if(posc==1){             
          let photo: Photo = await this.photoService.addNewToCamara();            
          console.log( "Foto",photo.webviewPath);
          if(photo){
            this.foto1 = photo.webviewPath;
            /* this.foto164=this.photoService.devuelve64();
            this.datos.setfoto1(this.foto164); */ 

          }
        }
        if(posc==2){             
          let photo: Photo = await this.photoService.addNewToCamara();            
          console.log( "Foto",photo.webviewPath);
          if(photo){
             this.foto2 = photo.webviewPath;
        /*     this.foto264=this.photoService.devuelve64();
            this.datos.setfoto2(this.foto264);  */
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
            /* this.foto064=this.photoService.devuelve64();
            this.datos.setfoto0(this.foto064);
            console.log("paso..../",this.photoServ */
            console.log("mi foto",this.foto0);
            
          }
          if(posc==1){ 
           this.foto1 = photos[0].webviewPath;
           /*  this.foto164=this.photoService.devuelve64();
            this.datos.setfoto1(this.foto164);  */
          }   
          if(posc==2){ 
          this.foto2 = photos[0].webviewPath;
          /*   this.foto264=this.photoService.devuelve64();
            this.datos.setfoto2(this.foto264);  */

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
verFactura(){
   this.navCtrl.navigateRoot('/factura', {animated: true, animationDirection: 'back' }) ;
      
   
}

}

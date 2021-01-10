import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { TaskModel } from 'src/app/models/task.model';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.page.html',
  styleUrls: ['./titulo.page.scss'],
})
export class TituloPage implements OnInit {


  titulo:string="";
  checkSi:boolean=false;
  checkNo:boolean=true; 
  servicio:string="";
  task:TaskModel;

  constructor(private datos:ObtSubSService,
    public navCtrl:NavController,
    private platform: Platform,
    public alertCtrl: AlertController) {

      this.platform.backButton.subscribeWithPriority(10, () => {
        this.navCtrl.navigateRoot('/tarea', {animated: true, animationDirection: 'back' }) ;
          
        });
     }

  ngOnInit() {
    this.servicio=this.datos.getServ();
    console.log(this.servicio);
    this.titulo=this.datos.gettitulo();

  }


  checkSiF(){
    this.checkNo=false;
    this.checkSi=true;
   
    
    }
    checkNoF(){
    this.checkNo=true;
    this.checkSi=false;
   
    
    
    }
    cerrarsolicitud(){
   
   this.presentAlert();
}

goto(){
  this.datos.setTitulo(this.titulo);
  this.datos.setUtiles(this.checkSi);

      

  this.navCtrl.navigateRoot('/horarios', {animated: true, animationDirection: 'forward' }) ;
   
}

async presentAlert() {
  const alert = await this.alertCtrl.create({
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
}
}

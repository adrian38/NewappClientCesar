import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.page.html',
  styleUrls: ['./comentario.page.scss'],
})
export class ComentarioPage implements OnInit {

  servicio:string="";

  comentario:string="";
  constructor(private datos:ObtSubSService,
    private platform: Platform,
    public navCtrl:NavController,
    public alertCtrl: AlertController) {

      this.platform.backButton.subscribeWithPriority(10, () => {
        this.navCtrl.navigateRoot('/direccion', {animated: true, animationDirection: 'back' }) ;
          
        });

     }
  ngOnInit() {

    this.comentario=this.datos.getcomentario();

    this.servicio=this.datos.getServ();
  }
  cerrarsolicitud(){
  
    this.presentAlert();
  }
  goto(){
  

this.datos.setcomentario(this.comentario);

    this.navCtrl.navigateRoot('/foto', {animated: true, animationDirection: 'forward' }) ;
     
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

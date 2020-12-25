import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
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
    public navCtrl:NavController) {

      this.platform.backButton.subscribeWithPriority(10, () => {
        this.navCtrl.navigateRoot('/direccion', {animated: true, animationDirection: 'back' }) ;
          
        });

     }
  ngOnInit() {
    this.servicio=this.datos.getServ();
  }

  cerrarsolicitud(){
    this.navCtrl.navigateRoot('/tabs/tab1', {animated: true, animationDirection: 'forward' }) ;
      
  
  }
  goto(){
  

this.datos.setcomentario(this.comentario);
    this.navCtrl.navigateRoot('/foto', {animated: true, animationDirection: 'forward' }) ;
     
  }

}

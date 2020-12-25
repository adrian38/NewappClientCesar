import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
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
    private platform: Platform) {

      this.platform.backButton.subscribeWithPriority(10, () => {
        this.navCtrl.navigateRoot('/tabs/tab1', {animated: true, animationDirection: 'back' }) ;
          
        });
     }

  ngOnInit() {
    this.servicio=this.datos.getServ();
    console.log(this.servicio);
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
  this.navCtrl.navigateRoot('/tabs/tab1', {animated: true, animationDirection: 'forward' }) ;
    

}

goto(){
  this.datos.setTitulo(this.titulo);
  this.datos.setUtiles(this.checkSi);
  this.navCtrl.navigateRoot('/horarios', {animated: true, animationDirection: 'forward' }) ;
   
}
}

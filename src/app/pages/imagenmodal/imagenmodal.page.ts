import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-imagenmodal',
  templateUrl: './imagenmodal.page.html',
  styleUrls: ['./imagenmodal.page.scss'],
})
export class ImagenmodalPage implements OnInit {

  imagen:string;
  sliderOption ={
    zoom:{
      maxRatio:2
    }
  }
  constructor(private modalCtrl:ModalController,
              private navparams:NavParams)  {

             this.imagen=this.navparams.get('imagen');
             console.log(this.imagen);
               }

  ngOnInit() {
  }

  cerrar(){
    this.modalCtrl.dismiss();
  }
}

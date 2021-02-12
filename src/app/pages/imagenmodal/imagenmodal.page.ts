import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

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
              private navparams:NavParams,
              private screenOrientation: ScreenOrientation)  {

             this.imagen=this.navparams.get('imagen');
             console.log(this.imagen);
               }

  ngOnInit() {

    console.log(this.screenOrientation.type); // logs the current orientation, example: 'landscape'

// set to landscape
/* this.screenOrientation.lock('portrait'); */
/* this.screenOrientation.ORIENTATIONS.PORTRAIT */

 this.screenOrientation.unlock();


this.screenOrientation.onChange().subscribe(
   () => {
       console.log("Orientation Changed");
     
   }
); 
  }

  cerrar(){
    this.modalCtrl.dismiss();
  }
}

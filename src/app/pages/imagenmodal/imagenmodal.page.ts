import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController, NavParams,IonSlide, Platform, NavController } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-imagenmodal',
  templateUrl: './imagenmodal.page.html',
  styleUrls: ['./imagenmodal.page.scss'],
})
export class ImagenmodalPage implements OnInit {

 // @ViewChild  ('slides') slides:IonSlide;
  @ViewChild ('slides',{read:ElementRef}) slide:ElementRef;

  imagen:string;
  vertical:boolean

 /*  sliderOption ={
    zoom:{
      maxRatio:2
    }
  } */
  constructor(private modalCtrl:ModalController,
              private navparams:NavParams,
              private screenOrientation: ScreenOrientation,
              public navCtrl:NavController,
              private platform: Platform)  {

             this.imagen=this.navparams.get('imagen');
             //console.log(this.imagen);
               }

  ngOnInit() {

     this.screenOrientation.unlock();
    
/* 
   this.platform.backButton.subscribeWithPriority(10, () => {
      this.cerrar();
        
      });  */ 
  

  
  }

  ngOnDestroy(): void {
   this.screenOrientation.lock('portrait'); 
  console.log("cerrado imagen")
  }

  

  cerrar(){
    this.screenOrientation.lock('portrait');
    console.log("cerrarimagen")
    this.modalCtrl.dismiss();

  }
 /*  zoomin(){
    this.slide.nativeElement.swiper.zoom.in()
    console.log("+");
  }
  zoomout(){
    this.slide.nativeElement.swiper.zoom.out();
    console.log("-");
  } */
}

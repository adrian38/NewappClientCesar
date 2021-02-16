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
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.screenOrientation.lock('portrait');
      this.navCtrl.navigateRoot('/ofertas', {animated: true, animationDirection: 'back' }) ;
        
      });

    //console.log(this.screenOrientation.type); // logs the current orientation, example: 'landscape'
    console.log("esto",this.slide);
    this.screenOrientation.onChange().subscribe(
      () => {
          console.log("Orientation Changed",this.screenOrientation.type);
         if(this.screenOrientation.type == "landscape-primary"){
           this.vertical=false;
         }
         else
         this.vertical=true;
        
      }
   );  

   this.screenOrientation.unlock();
  }

  cerrar(){
    this.screenOrientation.lock('portrait');
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

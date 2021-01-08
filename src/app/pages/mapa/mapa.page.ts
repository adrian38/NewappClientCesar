import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Marcador } from 'src/app/models/marcador.class';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { Geolocation} from '@capacitor/core';
import { NavController, Platform } from '@ionic/angular';
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {




  marcadores: Marcador[] = [];

  title = 'My first AGM project';
  /* lat =23.087365;
  lng =  -82.426493;  */ 
  lat :number;
  lng :number; 
coordenadas:boolean=false;

  constructor(private Serv: ObtSubSService,
              public toastController: ToastController,
              private platform: Platform,
              public navCtrl:NavController
             ) {
              this.platform.backButton.subscribeWithPriority(10, () => {
                this.navCtrl.navigateRoot('/direccion', {animated: true, animationDirection: 'back' }) ;
                  
                });
              }

  async ngOnInit() {

  }
  agregarMarcador( evento ) {
    this.marcadores=[];
    console.log(evento);
    this.Serv.setLatitud(evento.coords.lat);
    this.Serv.setLongitud(evento.coords.lng);
    
    const coords: { lat: number, lng: number } = evento.coords;

    const nuevoMarcador = new Marcador( coords.lat, coords.lng );

    this.marcadores.push( nuevoMarcador ); 
    this.presentToast();
    this.coordenadas=true;
    this.Serv.setcoordenada(true);

  }


  borrarMarcador( i: number ) {
    console.log(i);
    this.marcadores.splice(i, 1);
    this.presentToastBorrar();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Marcador agregado',
      duration: 2000
    });
    toast.present();
  }

  async presentToastBorrar() {
    const toast = await this.toastController.create({
      message: 'Marcador eliminado',
      duration: 2000
    });
    toast.present();
  }

  async getLocation() {
    const position = await Geolocation.getCurrentPosition();
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;
    console.log(this.lat);
    console.log(this.lng);
    this.Serv.setLatitud(this.lat);
    this.Serv.setLongitud(this.lng);
    this.marcadores=[];
    const nuevoMarcador = new Marcador( this.lat, this.lng );
    this.marcadores.push( nuevoMarcador ); 
    this.Serv.setcoordenada(true);
  }

  irubicacion(){
    this.getLocation();
  }


 
}

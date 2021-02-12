import { Component, OnInit } from '@angular/core';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { Marcador } from 'src/app/models/marcador.class';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';

@Component({
  selector: 'app-regismapa',
  templateUrl: './regismapa.page.html',
  styleUrls: ['./regismapa.page.scss'],
})
export class RegismapaPage implements OnInit {

  marcadores: Marcador[] = [];
  lat :number;
  lng :number;
  coordenadas:boolean=false;

  constructor(private Serv: ObtSubSService,
    public toastController: ToastController,
    private platform: Platform,
    public navCtrl:NavController) {
    }

ngOnInit() {

this.platform.backButton.subscribeWithPriority(10, () => {
this.navCtrl.navigateRoot('/registro', {animated: true, animationDirection: 'back' }) ;

});

navigator.geolocation.getCurrentPosition(posicion =>{
  this.lat = posicion.coords.latitude;
  this.lng = posicion.coords.longitude;
  this.Serv.setLatitud(this.lat);
  this.Serv.setLongitud(this.lng);
  this.marcadores=[];
  const nuevoMarcador = new Marcador( this.lat, this.lng );
  this.marcadores.push( nuevoMarcador ); 
  this.Serv.setcoordenada(true);
})


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
  /* this.coordenadas=true; */
  this.Serv.setcoordenada(true);

}

async presentToast() {
  const toast = await this.toastController.create({
    message: 'Marcador agregado',
    duration: 2000
  });
  toast.present();
}


irubicacion(){
  navigator.geolocation.getCurrentPosition(posicion =>{
    this.lat = posicion.coords.latitude;
    this.lng = posicion.coords.longitude;
    this.Serv.setLatitud(this.lat);
    this.Serv.setLongitud(this.lng);
    this.marcadores=[];
    const nuevoMarcador = new Marcador( this.lat, this.lng );
    this.marcadores.push( nuevoMarcador ); 
    this.Serv.setcoordenada(true);
  })
}
}

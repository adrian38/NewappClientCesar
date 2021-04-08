import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Marcador } from 'src/app/models/marcador.class';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { NavController, Platform } from '@ionic/angular';
//import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {




  marcadores: Marcador[] = [];
 
  
  lat = 19.29095;
	lng = -99.653015; 
  coordenadas:boolean=false;
  calle;
  numero;
    ruta:string="";

  constructor(private Serv: ObtSubSService,
              public toastController: ToastController,
              private platform: Platform,
              public navCtrl:NavController,
              private datos:ObtSubSService,
             // private mapsAPILoader: MapsAPILoader
             ) {

             /*  this.calle= this.datos.getcalle().trim(),"calle";
              this.numero=this.datos.getnumero(); */
              }

    ngOnInit() {

        this.ruta=this.datos.getruta();
      
      
        this.platform.backButton.subscribeWithPriority(10, () => {
          if(this.ruta=="datospersonales")
          {
          this.navCtrl.navigateRoot('/datospersonales', {animated: true, animationDirection: 'back' }) ;
        }
        else{
      
          this.navCtrl.navigateRoot('/direccion', {animated: true, animationDirection: 'back' }) ;
        
  
        }
          }); 

          /* this.mapsAPILoader.load().then(() => { 
    
            const geocoder = new google.maps.Geocoder();
            const address = "España"+" "+ this.calle+ " "+this.numero;
            geocoder.geocode({ address: address }, (results, status) => {
              if (status === "OK") {
                
                this.lat = results[0].geometry.location.lat();
                this.lng = results[0].geometry.location.lng();
                
                
              } else {
        
                console.log("error");
                alert("Geocode was not successful for the following reason: " + status);
              }
            });
            
          }); */
 
  }
    
  agregarMarcador( evento ) {
    this.marcadores=[];
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

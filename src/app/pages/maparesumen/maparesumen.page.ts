import { Component, OnInit } from '@angular/core';
import { Marcador } from 'src/app/models/marcador.class';
import { TaskOdooService } from 'src/app/services/task-odoo.service';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { NavController, Platform } from '@ionic/angular';
@Component({
  selector: 'app-maparesumen',
  templateUrl: './maparesumen.page.html',
  styleUrls: ['./maparesumen.page.scss'],
})
export class MaparesumenPage implements OnInit {


  lat :number;
  lng :number;
  marcadores: Marcador[] = [];

  constructor(private datos:ObtSubSService,
              public navCtrl:NavController,
              private platform: Platform) { }

  ngOnInit() {

    setTimeout(() => {
			document.getElementById('map-parent').style.width = '100%';
      		}, 50);

    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot('/resumen', {animated: true, animationDirection: 'back' }) ;
        
      });
    this.lat=Number(this.datos.getlatitud());
    this.lng=Number(this.datos.getlongitud());
    const nuevoMarcador = new Marcador( this.lat, this.lng );

    this.marcadores.push( nuevoMarcador ); 
  }

}

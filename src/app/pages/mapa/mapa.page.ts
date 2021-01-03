import { Component, OnInit } from '@angular/core';
import { Marcador } from 'src/app/models/marcador.class';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {




  marcadores: Marcador[] = [];

  title = 'My first AGM project';
  lat =23.087365;
  lng =  -82.426493;  


  constructor(
  ) {}

  async ngOnInit() {

  }
  agregarMarcador( evento ) {

    console.log(evento);
    const coords: { lat: number, lng: number } = evento.coords;

    const nuevoMarcador = new Marcador( coords.lat, coords.lng );

    this.marcadores.push( nuevoMarcador ); 

    //this.guardarStorage();
   // this.snackBar.open('Marcador agregado', 'Cerrar', { duration: 3000 });

  }

}

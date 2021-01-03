import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007; 
  constructor() { }

  ngOnInit() {


  }

}

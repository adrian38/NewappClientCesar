import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';

@Component({
  selector: 'app-option',
  templateUrl: './option.page.html',
  styleUrls: ['./option.page.scss'],
})
export class OptionPage implements OnInit {

  sub_servicios_activos:string[]=["Cambio de llaves de paso",
                                  "Cambio de grifería",
                                  "Cambio de sifón",
                                  "Radiadores y calefacción",
                                  "Pequeño desatasco",
                                  "Gran desatasco",
                                  "Mecanismo cisterna",
                                  "Termos y calderas",
                                  "Contadores de agua",
                                  "Reforma pequeña",
                                  "Reforma integral",
                                  "Arreglo urgete de fuga"];

  constructor( public navCtrl:NavController,
               private platform: Platform,
               private datos:ObtSubSService) { }

  ngOnInit() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot('/tarea', {animated: true, animationDirection: 'back' }) ;
      
      }); 
  }

  seleccionado(i){
    console.log(i);
    this.datos.set_sub_servicio_activo(i);
    this.datos.setTitulo(i);
    this.datos.setruta("option");
    this.navCtrl.navigateRoot('/materiales', {animated: true, animationDirection: 'forward' }) ;
 
  }

  seleccionado_otras_causas(){
    this.datos.set_sub_servicio_activo("");
    this.navCtrl.navigateRoot('/titulo', {animated: true, animationDirection: 'forward' }) ;
 
  }
}

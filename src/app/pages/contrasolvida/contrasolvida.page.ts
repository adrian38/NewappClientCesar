import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-contrasolvida',
  templateUrl: './contrasolvida.page.html',
  styleUrls: ['./contrasolvida.page.scss'],
})
export class ContrasolvidaPage implements OnInit {

  constructor(public navCtrl:NavController) { }

  ngOnInit() {
  }

  enviar(){
    this.navCtrl.navigateRoot('/login', {animated: true, animationDirection: 'back' }) ;
        
  }
}

import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-contrasolvida',
  templateUrl: './contrasolvida.page.html',
  styleUrls: ['./contrasolvida.page.scss'],
})
export class ContrasolvidaPage implements OnInit {

  constructor(public navCtrl:NavController,
              private platform: Platform) { }

  ngOnInit() {

    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot('/login', {animated: true, animationDirection: 'back' }) ;
    });
  }

  enviar(){
    this.navCtrl.navigateRoot('/login', {animated: true, animationDirection: 'back' }) ;
        
  }
}

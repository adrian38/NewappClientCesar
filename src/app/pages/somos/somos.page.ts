import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-somos',
  templateUrl: './somos.page.html',
  styleUrls: ['./somos.page.scss'],
})
export class SomosPage implements OnInit {

  constructor(private platform: Platform,
              private navCtrl: NavController) { }

  ngOnInit() {

    
    this.platform.backButton.subscribeWithPriority(10, () => {
    
      this.navCtrl.navigateRoot('/tabs/tab3', {animated: true, animationDirection: 'back' }) ;
  
       
       });
  }

}

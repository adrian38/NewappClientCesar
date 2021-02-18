import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertController, Platform, NavController } from '@ionic/angular';
import { Location } from '@angular/common';

import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor( private route:Router,
    private platform: Platform,
    public alertController: AlertController, 
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _location: Location,
    private navCon:NavController,
    
    private screenOrientation: ScreenOrientation) { 



      this.initializeApp();

      // get current
console.log(this.screenOrientation.type); // logs the current orientation, example: 'landscape'

// set to landscape
this.screenOrientation.lock('portrait');
/* this.screenOrientation.ORIENTATIONS.PORTRAIT */

/*  this.screenOrientation.unlock();


this.screenOrientation.onChange().subscribe(
   () => {
       console.log("Orientation Changed",this.screenOrientation.type);
      
     
   }
);  */
    }

  ngOnInit() {
  }
navegar(){
 // this.route.navigateByUrl('/login', {replaceUrl : true}) ;
     this.navCon.navigateRoot('/login', {animated: true, animationDirection: 'forward' }) ;
    
}

initializeApp() {
  this.platform.ready().then(() => {
    this.statusBar.styleDefault();
    this.splashScreen.hide();
  });


  this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
    console.log('Back press handler!');
    if (this._location.isCurrentPathEqualTo('/inicio')) {

      // Show Exit Alert!
      console.log('Show Exit Alert!');
      this.showExitConfirm();
      processNextHandler();
    } else {

      // Navigate to back page
      console.log('Navigate to back page');
      this._location.back();

    }

  });

  this.platform.backButton.subscribeWithPriority(5, () => {
    console.log('Handler called to force close!');
    this.alertController.getTop().then(r => {
      if (r) {
        navigator['app'].exitApp();
      }
    }).catch(e => {
      console.log(e);
    })
  });

}

showExitConfirm() {
  this.alertController.create({
    header: 'App termination',
    message: 'Do you want to close the app?',
    backdropDismiss: false,
    buttons: [{
      text: 'Stay',
      role: 'cancel',
      handler: () => {
        console.log('Application exit prevented!');
      }
    }, {
      text: 'Exit',
      handler: () => {
        navigator['app'].exitApp();
      }
    }]
  })
    .then(alert => {
      alert.present();
    });
}


}

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
	styleUrls: [ './inicio.page.scss' ]
})
export class InicioPage implements OnInit {
	constructor(
		
		private platform: Platform,
		public alertController: AlertController,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private _location: Location,
		private navCon: NavController,
		private screenOrientation: ScreenOrientation
	) {
		this.initializeApp();

			// set to landscape
		this.screenOrientation.lock('portrait');
	}

	ngOnInit() {}
	navegar() {
		this.navCon.navigateRoot('/login', { animated: true, animationDirection: 'forward' });
	}
	registro() {
		this.navCon.navigateRoot('/registro', { animated: true, animationDirection: 'forward' });
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});

		this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
			if (this._location.isCurrentPathEqualTo('/inicio')) {
				// Show Exit Alert!

				this.showExitConfirm();
				processNextHandler();
			} else {
				// Navigate to back page
				this._location.back();
			}
		});

		this.platform.backButton.subscribeWithPriority(5, () => {
			this.alertController
				.getTop()
				.then((r) => {
					if (r) {
						navigator['app'].exitApp();
					}
				})
				.catch((e) => {});
		});
	}

	showExitConfirm() {
		this.alertController
			.create({
				header: 'Alerta',
				message: 'Desea salir de la aplicacion?',
				backdropDismiss: false,
				buttons: [
					{
						text: 'Cancelar',
						role: 'cancel',
						handler: () => {}
					},
					{
						text: 'Salir',
						handler: () => {
							navigator['app'].exitApp();
						}
					}
				]
			})
			.then((alert) => {
				alert.present();
			});
	}
}

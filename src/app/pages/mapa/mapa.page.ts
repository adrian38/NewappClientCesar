import { Component, OnInit, NgZone } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Marcador } from 'src/app/models/marcador.class';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { NavController, Platform } from '@ionic/angular';
import { Capacitor, Plugins } from '@capacitor/core';
import { LocationService } from 'src/app/services/location.service';
import { MapsAPILoader } from '@agm/core';
const { Geolocation, Toast } = Plugins;

@Component({
	selector: 'app-mapa',
	templateUrl: './mapa.page.html',
	styleUrls: [ './mapa.page.scss' ]
})
export class MapaPage implements OnInit {
	marcadores: Marcador[] = [];
	lat = 19.29095;
	lng = -99.653015;
	coordenadas: boolean = false;
	ruta: string = '';
	watchId: any;
	numero: string = '';
	calle: string = '';
	localizar: boolean = false;
	zoom = 2;

	constructor(
		private Serv: ObtSubSService,
		public toastController: ToastController,
		private platform: Platform,
		public navCtrl: NavController,
		private datos: ObtSubSService,
		private mapsAPILoader: MapsAPILoader,
		public ngZone: NgZone,
		private locationService: LocationService
	) {
		this.calle = this.datos.getcalle().trim();

		if (this.calle) {
			this.numero = this.datos.getnumero();
			this.getLocaleDirection();
		} else {
			this.getMyLocation(false);
		}

		/*  this.calle= this.datos.getcalle().trim(),"calle";
              this.numero=this.datos.getnumero(); */
	}
	ngOnInit() {
		setTimeout(() => {
			document.getElementById('map-parent').style.width = '100%';
		}, 50);

		this.ruta = this.datos.getruta();

		this.platform.backButton.subscribeWithPriority(10, () => {
			if (this.ruta == 'datospersonales') {
				this.navCtrl.navigateRoot('/datospersonales', { animated: true, animationDirection: 'back' });
			} else {
				this.navCtrl.navigateRoot('/registro', { animated: true, animationDirection: 'back' });
			}
		});

		/* this.platform.backButton.subscribeWithPriority(10, () => {
            this.navCtrl.navigateRoot('/registro', {animated: true, animationDirection: 'back' }) ;
            
            }); */
	}

	getLocaleDirection() {
		this.mapsAPILoader.load().then(() => {
			const geocoder = new google.maps.Geocoder();
			const address = 'España' + ' ' + this.calle + ' ' + this.numero;
			geocoder.geocode({ address: address }, (results, status) => {
				if (status === 'OK') {
					this.lat = results[0].geometry.location.lat();
					this.lng = results[0].geometry.location.lng();
					this.zoom = 18;
				} else {
					console.log('error');
					alert('Geocode was not successful for the following reason: ' + status);
				}
			});
		});
	}

	agregarMarcador(evento) {
		this.marcadores = [];
		this.Serv.setLatitud(evento.coords.lat);
		this.Serv.setLongitud(evento.coords.lng);
		const coords: { lat: number; lng: number } = evento.coords;
		const nuevoMarcador = new Marcador(coords.lat, coords.lng);
		this.marcadores.push(nuevoMarcador);
		this.presentToast();
		this.Serv.setcoordenada(true);
	}

	async presentToast() {
		const toast = await this.toastController.create({
			message: 'Marcador agregado',
			duration: 2000
		});
		toast.present();
	}

	async getMyLocation(marker: Boolean) {
		if (marker) {
			this.localizar = true;
		}

		const hasPermission = await this.locationService.checkGPSPermission();
		if (hasPermission) {
			if (Capacitor.isNative) {
				const canUseGPS = await this.locationService.askToTurnOnGPS();
				this.postGPSPermission(canUseGPS);
			} else {
				this.postGPSPermission(true);
			}
		} else {
			const permission = await this.locationService.requestGPSPermission();
			if (permission === 'CAN_REQUEST' || permission === 'GOT_PERMISSION') {
				if (Capacitor.isNative) {
					const canUseGPS = await this.locationService.askToTurnOnGPS();
					this.postGPSPermission(canUseGPS);
				} else {
					this.postGPSPermission(true);
				}
			} else {
				await Toast.show({
					text: 'User denied location permission'
				});
			}
		}
	}

	async postGPSPermission(canUseGPS: boolean) {
		if (canUseGPS) {
			this.watchPosition();
		} else {
			await Toast.show({
				text: 'Please turn on GPS to get location'
			});
		}
	}

	async watchPosition() {
		try {
			this.watchId = Geolocation.watchPosition({}, (position, err) => {
				this.ngZone.run(() => {
					if (err) {
						console.log('err', err);
						return;
					}
					this.lat = position.coords.latitude;
					this.lng = position.coords.longitude;
					this.zoom = 18;

					if (this.localizar) {
						this.marcadores = [];
						this.Serv.setLatitud(this.lat);
						this.Serv.setLongitud(this.lng);

						const nuevoMarcador = new Marcador(this.lat, this.lng);
						this.marcadores.push(nuevoMarcador);
						this.presentToast();
						this.Serv.setcoordenada(true);
					}

					this.clearWatch();
				});
			});
		} catch (err) {
			console.log('err', err);
		}
	}

	clearWatch() {
		if (this.watchId != null) {
			Geolocation.clearWatch({ id: this.watchId });
		}
	}
}

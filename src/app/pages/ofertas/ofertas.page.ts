import { Component, OnInit, NgZone, ViewChild, OnDestroy } from '@angular/core';

import {
	NavController,
	Platform,
	IonSegment,
	LoadingController,
	ModalController,
	AlertController
} from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { TaskModel } from 'src/app/models/task.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthOdooService } from 'src/app/services/auth-odoo.service';
import { ChatOdooService } from 'src/app/services/chat-odoo.service';
import { TaskOdooService } from 'src/app/services/task-odoo.service';
import { MessageService } from 'primeng/api';

import { ObtSubSService } from 'src/app/services/obt-sub-s.service';

import { ImagenmodalPage } from '../imagenmodal/imagenmodal.page';

import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
	selector: 'app-ofertas',
	templateUrl: './ofertas.page.html',
	styleUrls: [ './ofertas.page.scss' ]
})
export class OfertasPage implements OnInit, OnDestroy {
	@ViewChild(IonSegment) segment: IonSegment;

	val: number;
	userType: string = '';
	user: UsuarioModel;
	task: TaskModel;
	foto0: string = '../../../assets/icon/noImage.svg';

	offersList: TaskModel[];
	habilitar1: boolean = false;
	habilitar2: boolean = false;
	habilitar3: boolean = false;

	offersList$: Observable<TaskModel[]>;
	notificationOffertCancelled$: Observable<number[]>;
	notificationNewOffertSuplier$: Observable<number[]>;
	notificationPoCancelled$:Observable<number[]>

	subscriptionOffersList: Subscription;
	subscriptionOffertCancelled: Subscription;
	subscriptioNewPoSuplier: Subscription;
	subscriptionPoCancelled: Subscription;

	veroferta: boolean = true;
	verdetalles: boolean = false;
	valorSegment: string = '';
	showSubCard = false;
	ofertaDisponible = false;
	numero_tarjeta: string = '';
	datos: string = '';
	display: boolean = false;
	displayAceptar: number;
	fotoZoom: boolean = false;
	loading: HTMLIonLoadingElement = null;
	loading1: any;

	imagenes: string[] = [];

	efectivo: boolean = false;
	desplegar: boolean = false;

	constructor(
		public navCtrl: NavController,
		public alertController: AlertController,
		private _taskOdoo: TaskOdooService,
		private _authOdoo: AuthOdooService,
		private ngZone: NgZone,
		private _chatOdoo: ChatOdooService,
		private platform: Platform,
		private messageService: MessageService,
		public loadingController: LoadingController,
		private screenOrientation: ScreenOrientation,
		private subServ: ObtSubSService,
		private modalCtrl: ModalController
	) {
		this.task = new TaskModel();
		this.veroferta = true;
		this.verdetalles = false;
	}

	ngOnInit() {


		this.screenOrientation.lock('portrait');
		this.user = this._authOdoo.getUser();
		this.task = this._taskOdoo.getTaskCesar();
		this._taskOdoo.solicitudeListEdit(this.task.id,2);
		
		this.subscriptions();

		

		this.offersList = [];
		this.userType = this.user.type;

		this.deshabilitar1();
		this.deshabilitar2();
		this.deshabilitar3();
	
	
		
		this.platform.backButton.subscribeWithPriority(10, () => {
			this.navCtrl.navigateRoot('/tabs/tab1', { animated: true, animationDirection: 'back' });
		});

		

		if (!this.subServ.get_Detalles()) {
			
			setTimeout(() => {
				this.segment.value = 'ofertas';
			}, 100);
		} else {
			
			setTimeout(() => {
				this.segment.value = 'detalle';
			}, 100);
		}
		
		
	}



	ngOnDestroy(): void {
		
		this.subscriptioNewPoSuplier.unsubscribe();
		this.subscriptionOffersList.unsubscribe();
		this.subscriptionOffertCancelled.unsubscribe();
		this.subscriptionPoCancelled.unsubscribe();
	}




	subscriptions(){


		/////////para notificaciones borradas por el provider
		this.notificationOffertCancelled$ = this._taskOdoo.getRequestedNotificationOffertCancelled$();
		this.subscriptionOffertCancelled = this.notificationOffertCancelled$.subscribe(
			(notificationOffertCancelled) => {
				this.ngZone.run(() => {

					if (typeof this.offersList !== 'undefined' && this.offersList.length > 0) {
						for (let Po_id of notificationOffertCancelled) {
							let temp = this.offersList.findIndex((element) => element.id === Po_id);
							if (temp !== -1) {
								this.offersList.splice(temp, 1);
							}
						}
						if(!(typeof this.offersList !== 'undefined' && this.offersList.length > 0)){
							this.ofertaDisponible = true;
						}
					}
				});
			}
		);


		////////////////////////////////Para notificaciones borradas por el cliente

		this.notificationPoCancelled$ = this._taskOdoo.getRequestedNotificationPoCancelled$();
		this.subscriptionPoCancelled = this.notificationPoCancelled$.subscribe(
			(notificationOffertCancelled) => {
				this.ngZone.run(() => {

					if (typeof this.offersList !== 'undefined' && this.offersList.length > 0) {
						for (let Po_id of notificationOffertCancelled) {
							let temp = this.offersList.findIndex((element) => element.id === Po_id);
							if (temp !== -1) {
								this.offersList.splice(temp, 1);
							}
						}
					}

					if(!(typeof this.offersList !== 'undefined' && this.offersList.length > 0)){
						this.ofertaDisponible = true;
					}
					this.loading.dismiss();
				});
			}
		);

		
		

		this.notificationNewOffertSuplier$ = this._taskOdoo.getRequestedNotificationNewOffertSuplier$();
		this.subscriptioNewPoSuplier = this.notificationNewOffertSuplier$.subscribe((notificationNewOffertSuplier) => {
			this.ngZone.run(() => {
				/*           for (let Po_id of notificationNewOffertSuplier) {

          ////////como asocio una po con un task
  
      } */

				console.log('nueva oferta ha llegado');
			});
		});

		this.offersList$ = this._taskOdoo.getOffers$();
		this.subscriptionOffersList = this.offersList$.subscribe((offersList) => {
			this.ngZone.run(() => {
				if (offersList.findIndex((element) => element.origin === this.task.id_string) !== -1) {
					////Parar cargando
					this.loading.dismiss();

					if (offersList[0].budget !== 0) {
						this.offersList = offersList;

						this.showSubCard = true;
						this.ofertaDisponible = false;
					} else {
						// this.showSubCard = false;

						this.messageService.add({
							key: 'c',
							severity: 'error',
							summary: 'Disculpe',
							detail: 'Todavia no hay ofertas.'
						});
						this.showSubCard = false;
						this.ofertaDisponible = true;
					}
				}
			});
		});
	}




	segChange(event) {

		;
		this.valorSegment = event.detail.value;

		if (this.valorSegment === 'ofertas') {
			this.veroferta = true;
			this.verdetalles = false;

			///// Sacar cargando
			this.presentLoading();
			this._taskOdoo.requestOffersForTask(this.task.id_string);
		}

		if (this.valorSegment === 'detalle') {
			this.veroferta = false;
			this.verdetalles = true;
			this.displayAceptar = -1;
		}
	}

	openChat(id) {
		this.displayAceptar = -1;
		this._chatOdoo.setIdPo(id);
		this.navCtrl.navigateRoot([ '/chat' ], { animated: true, animationDirection: 'back' });
	}

	verubicacion() {
		this.subServ.setruta('/ofertas');
		this.navCtrl.navigateRoot('/detallemapa', { animated: true, animationDirection: 'back' });
	}

	showDialog(i) {
		this.displayAceptar = -1;
		this.subServ.setposicion(i);

		this.task = this.offersList[i];
		this._taskOdoo.setTaskCesar(this.task);

		this.display = true;
	}

	//////////////////////////////Arreglar Cancelacion
	cancelSOclient(id:number) {
		this.displayAceptar = -1;
		this.presentLoading();
		this._taskOdoo.cancelPOsuplier(id);
		
		
	}

	////////////////////////////////////////
	showDialogAceptar(id) {
		console.log('aki', id);
		if (this.desplegar == false) {
			this.displayAceptar = id;
			this.desplegar = true;
		} else {
			this.displayAceptar = -1;
			this.desplegar = false;
		}
	}
	async presentLoading() {
		this.loading = await this.loadingController.create({
			cssClass: 'my-custom-class',
			message: 'Espere...'
			//duration: 2000
		});

		return this.loading.present();
	}

	imageClick(imagen) {
		this.modalCtrl
			.create({
				component: ImagenmodalPage,
				componentProps: {
					imagen: imagen
				}
			})
			.then((modal) => modal.present());
	}

	editnombre(name) {
		let nombre = name.split(' ');
		return nombre[0] + ' ' + nombre[1].slice(0, 1) + '.';
	}

	seleccionado() {
		if (this.efectivo == true) {
			this.efectivo = false;
		} else this.efectivo = true;
	}
	deshabilitar1() {
		if (this.task.photoNewTaskArray[0] == undefined) {
			this.habilitar1 = true;
		} else {
			this.habilitar1 = false;
		}
	}

	deshabilitar2() {
		if (this.task.photoNewTaskArray[1] == undefined) {
			this.habilitar2 = true;
		} else {
			this.habilitar2 = false;
		}
	}

	deshabilitar3() {
		if (this.task.photoNewTaskArray[2] == undefined) {
			this.habilitar3 = true;
		} else this.habilitar3 = false;
	}

	pagar(id, oring_id) {
		/* let d1=this.numero_tarjeta.charAt(0); */
		if (this.numero_tarjeta.charAt(0) == '4') {
			console.log('visa');
			this.tarjeta();
			this.dato();
			this.temporal('espere');
			/* this._taskOdoo.acceptProvider(993, 0); */

			this._taskOdoo.acceptProvider(id, oring_id);

			setTimeout(() => {
				this.loading1.dismiss();
				this.presentAlertConfirm();
			}, 2000);
		}

		if (
			this.numero_tarjeta.charAt(0) == '5' &&
			(this.numero_tarjeta.charAt(1) == '1' ||
				this.numero_tarjeta.charAt(1) == '2' ||
				this.numero_tarjeta.charAt(1) == '3' ||
				this.numero_tarjeta.charAt(1) == '4' ||
				this.numero_tarjeta.charAt(1) == '5')
		) {
			console.log('Master Card');
			this.tarjeta();
			this.dato();
			this.temporal('espere');

			this._taskOdoo.acceptProvider(id, oring_id);

			setTimeout(() => {
				this.loading1.dismiss();
				this.presentAlertConfirm();
			}, 2000);
		}
	}

	tarjeta() {
		let numPimpares = [];
		let numPpares = [];
		let suma_impar = 0;
		let suma_par = 0;
		for (let i = 0; i < this.numero_tarjeta.length; i += 2) {
			numPimpares[i] = parseInt(this.numero_tarjeta.charAt(i)) * 2;

			numPimpares[i] = this.numero_simple(numPimpares[i]);

			suma_impar += numPimpares[i];
		}
		for (let p = 1; p < this.numero_tarjeta.length; p += 2) {
			numPpares[p] = parseInt(this.numero_tarjeta.charAt(p));

			suma_par += numPpares[p];
		}

		var dif = (suma_par + suma_impar) % 10;
		console.log(dif);

		if (dif == 0) {
			console.log('valido');
		} else {
			console.log(' no valido');
		}
	}

	numero_simple(digit) {
		if (digit > 9) {
			var tmp = digit.toString();
			var d1 = parseInt(tmp.charAt(0));
			var d2 = parseInt(tmp.charAt(1));
			return d1 + d2;
		} else {
			return digit;
		}
	}
	dato() {
		console.log(this.datos);
		let mes = this.datos.slice(0, 2);
		console.log('mes', mes);
		let año = this.datos.slice(3, 5);
		console.log('año', año);
		let cvc = this.datos.slice(6, 9);
		console.log('cvc', cvc);
		if (cvc.length < 3 || cvc.charAt(0) == '0') {
			console.log('cvc incorrecto');
		}
	}

	async temporal(message: string) {
		this.loading1 = await this.loadingController.create({
			cssClass: 'my-custom-class',
			message /* 'Realizando transaccion', */
			/* duration: 2000 */
		});

		return this.loading1.present();
	}

	async presentAlertConfirm() {
		const alert = await this.alertController.create({
			cssClass: 'my-custom',
			header: 'Transaccion exitosa',
			message: 'Monto: 20 €',
			buttons: [
				{
					text: 'ok',
					role: 'cancel',
					cssClass: 'secondary',
					handler: () => {
						this.navCtrl.navigateRoot('/tabs/tab1', { animated: true, animationDirection: 'back' });
					}
				}
			]
		});

		await alert.present();
	}
}

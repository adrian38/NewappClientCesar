import { Component, NgZone, OnInit } from '@angular/core';
import { AlertController, NavController, LoadingController, Platform } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { TaskModel } from 'src/app/models/task.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { TaskOdooService } from 'src/app/services/task-odoo.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { ChatOdooService } from 'src/app/services/chat-odoo.service';
import { MessageModel } from 'src/app/models/message.model';

@Component({
	selector: 'app-tab1',
	templateUrl: 'tab1.page.html',
	styleUrls: [ 'tab1.page.scss' ]
})
export class Tab1Page implements OnInit {
	cant;
	id_string: string;
	task: TaskModel;
	solicitudesList: TaskModel[];
	tab: String;
	loading: any;
	solicitudVacia: boolean = true;

	
	notificationSOCancelled$: Observable<number>;
	tasksList$: Observable<boolean>; // servicio comunicacion
	notificationNewOffertSuplier$;
	notificationNewMessg$: Observable<number[]>;
	notificationNewMessgOrigin$: Observable<MessageModel[]>;

	subscriptionNotificationSoCancel: Subscription;
	subscriptioNewPoSuplier:Subscription;
	subscriptiontasksList: Subscription;
	subscriptionNotificationMess: Subscription;
	subscriptionNotificationMessgOrigin: Subscription;

	/* 
  @ViewChild('tabs') tabs: IonTabs; */

	constructor(
		private subServ: ObtSubSService,
		private _taskOdoo: TaskOdooService,
		private ngZone: NgZone,
		public navCtrl: NavController,
		private platform: Platform,
		public alertCtrl: AlertController,
		private messageService: MessageService,
		public loadingController: LoadingController,
		private statusBar: StatusBar,
		private _location: Location,
		private splashScreen: SplashScreen,
		private _chatOdoo: ChatOdooService,
	) {}

	ngOnInit(): void {
		this.subscriptions();
		this.init();
		this.subServ.set_Detalles(false);
		this._taskOdoo.setTab1In(true);
		
	}

	ngOnDestroy(): void {
		//Called once, before the instance is destroyed.
		//Add 'implements OnDestroy' to the class.
	
		this.subscriptionNotificationSoCancel.unsubscribe();
		this.subscriptiontasksList.unsubscribe();
		this.subscriptioNewPoSuplier.unsubscribe();
		this.subscriptionNotificationMess.unsubscribe();
		this.subscriptionNotificationMessgOrigin.unsubscribe();
		this._taskOdoo.setTab1In(false);
		
	}

	init() {
		if (!this._taskOdoo.getInitTab()) {
			this._taskOdoo.setInitTab();
			this._taskOdoo.requestTaskListClient();
			this.presentLoadingCargado();
		} else {

			this.solicitudesList = this._taskOdoo.getSolicitudeList();
			this.solicitudEmpty();
		}
	}

	subscriptions() {
		this.platform.backButton.subscribeWithPriority(10, () => {
			this.loading.dismiss();
			this.presentAlert();
		});

		this.notificationNewMessg$ = this._taskOdoo.getRequestedNotificationNewMessg$();
		this.subscriptionNotificationMess = this.notificationNewMessg$.subscribe(
			(notificationNewMessg) => {
				this.ngZone.run(() => {
					this._chatOdoo.requestNewMessageNoti(notificationNewMessg);
				});
			}
		);

		
		this.notificationNewMessgOrigin$ = this._chatOdoo.getMessagesOriginNotification$();//
		 this.subscriptionNotificationMessgOrigin = this.notificationNewMessgOrigin$.subscribe(
			(notificationNewMessg) => {
				this.ngZone.run(() => {
		
					for (let i = 0; i < notificationNewMessg.length; i++) {
						let temp = this.solicitudesList.findIndex((element) => element.id_string === notificationNewMessg[i].offer_origin);
						if (temp != -1) {
							this.solicitudesList[temp].notificationChat=true;
						
					}
				}

				});
			}
		); 



		this.notificationNewOffertSuplier$ = this._taskOdoo.getRequestedNotificationNewOffertSuplier$();
		this.subscriptioNewPoSuplier = this.notificationNewOffertSuplier$.subscribe((notificationNewOffertSuplier) => {
			this.ngZone.run(() => {
		
				for (let i = 0; i < notificationNewOffertSuplier.length; i++) {
					let temp = this.solicitudesList.findIndex((element) => element.id_string === notificationNewOffertSuplier[i]['origin']);
					if (temp != -1) {
						this.solicitudesList[temp].notificationOffert=true;
					
				}
			}
				console.log('nueva oferta ha llegado',this.solicitudesList);
			});
		});

		this.notificationSOCancelled$ = this._taskOdoo.getNotificationSoCancelled$();
		this.subscriptionNotificationSoCancel = this.notificationSOCancelled$.subscribe((notificationCancel) => {
			this.ngZone.run(() => {
				//////////////////////////////////////eliminar cargando

				let temp = this.solicitudesList.findIndex((element) => element.id === notificationCancel);
				if (temp !== -1) {
					this.solicitudesList.splice(temp, 1);
					
				}

				this.loading.dismiss();
				this.messageService.add({ severity: 'error', detail: 'Solicitud eliminada' });
			});
		});
	

		this.tasksList$ = this._taskOdoo.getRequestedTaskList$();
		this.subscriptiontasksList = this.tasksList$.subscribe((tasksList: boolean) => {
			this.ngZone.run(() => {
				if (tasksList) {
					this.solicitudesList = this._taskOdoo.getSolicitudeList();
				}
				this.solicitudEmpty();
				this.loading.dismiss();
			});
		});
	}

	solicitudEmpty() {
		if (typeof this.solicitudesList !== 'undefined' && this.solicitudesList.length > 0) {
			this.solicitudVacia = false;
		} else {
			this.solicitudVacia = true;
		}
	}

	in(i) {
		this.cant = i;
	
		this.task = this.solicitudesList[this.cant]; 
		this._taskOdoo.setTaskCesar(this.task);
		 this.subServ.setSolicitudeList(this.solicitudesList); 
		
		
		this.navCtrl.navigateRoot('/ofertas', { animated: true, animationDirection: 'forward' });
	}

	irSolicitud() {
		this.navCtrl.navigateRoot('/tarea', { animated: true, animationDirection: 'forward' });
	}

	async presentAlert() {
		
		this.loading.dismiss();  //////////////////////Probar a ver si quita las anteriores cuando doy atras


		const alert = await this.alertCtrl.create({
			cssClass: 'my-custom-class',
			header: 'Alerta',
			message: 'Desea registrarse con otro usuario',

			buttons: [
				{
					text: 'Cancelar',
					role: 'cancel',
					cssClass: 'secondary',
					handler: (blah) => {}
				},
				{
					text: 'Aceptar',
					handler: (datos) => {
						this.navCtrl.navigateRoot('/login', { animated: true, animationDirection: 'back' });
					}
				}
			]
		});

		await alert.present();
	}
	cancelar(i: number) {
		this.task = this.solicitudesList[i];
		this._taskOdoo.cancelSOclient(this.task.id);
		////////////////////////Cargando
		this.presentLoading();
	}

	async presentLoading() {
		this.loading = await this.loadingController.create({
			cssClass: 'my-custom-class',
			message: 'Eliminando Solicitud...'
			//duration: 2000
		});

		return this.loading.present();
	}

	async presentLoadingCargado() {
		this.loading = await this.loadingController.create({
			cssClass: 'my-custom-class',
			message: 'Cargando Solicitudes...'
			//duration: 2000
		});
		return this.loading.present();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});

		this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
			if (this._location.isCurrentPathEqualTo('/tabs/tab1')) {
				// Show Exit Alert!

				this.presentAlert();
				processNextHandler();
			} else {
				// Navigate to back page

				this._location.back();
			}
		});
	}
}

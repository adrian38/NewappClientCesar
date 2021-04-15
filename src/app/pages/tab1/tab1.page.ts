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
	user: UsuarioModel;
	loading: any;
	solicitudVacia: boolean = true;

	notificationTabs$: Observable<boolean>;
	notificationSOCancelled$: Observable<number>;
	tasksList$: Observable<boolean>; // servicio comunicacion

	subscriptionNotificationSoCancel: Subscription;
	subscriptionNotificationTab: Subscription;
	subscriptiontasksList: Subscription;

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
		private splashScreen: SplashScreen
	) {}

	ngOnInit(): void {
		this.solicitudEmpty();
		this.init();
		this.subscriptions();
		this.subServ.set_Detalles(false);
		this._taskOdoo.setTab1In();
		this.ss=this.subServ.get_cantidad_solicitud()

		
	}

	ngOnDestroy(): void {
		//Called once, before the instance is destroyed.
		//Add 'implements OnDestroy' to the class.
		this.subscriptionNotificationTab.unsubscribe();
		this.subscriptionNotificationSoCancel.unsubscribe();
		this.subscriptiontasksList.unsubscribe();
		this._taskOdoo.setTab1Out();
	}

	init() {

		if (!this._taskOdoo.getInitTab()) {
			this._taskOdoo.setInitTab();
			this._taskOdoo.requestTaskListClient();
			this.presentLoadingCargado();
		} else {
			this.solicitudesList = this._taskOdoo.getSolicitudeList();

			if (!this._taskOdoo.getPilaEmpthy()) {
				let temp = this._taskOdoo.getPilaSolicitud();
				for (let newElement of temp) {
					this.solicitudesList = this.subServ.getSolicitudeList();

					switch (newElement.notificationType) {
						case 1:
							this.solicitudesList.unshift(newElement);
							//////////////////////////agregar nueva solicitud en task servicio
							break;
						case 2:
							let temp = this.solicitudesList.findIndex(
								(element) => element.id_string === newElement.id_string
							);
							if (temp != -1) {
								this.solicitudesList[temp].notificationOffert = true;
							}
							break;
					}
				}
			}
		}
	}

	subscriptions(){

		this.platform.backButton.subscribeWithPriority(10, () => {
			this.loading.dismiss();
			this.presentAlert();
		});

	

		this.notificationSOCancelled$ = this._taskOdoo.getNotificationSoCancelled$();
		this.subscriptionNotificationSoCancel = this.notificationSOCancelled$.subscribe((notificationCancel) => {
			this.ngZone.run(() => {
				//////////////////////////////////////eliminar cargando
				this.loading.dismiss();
				this.messageService.add({ severity: 'error', detail: 'Solicitud eliminada' });
			});
		});

		this.notificationTabs$ = this.subServ.getNotificationSetTab$();
		this.subscriptionNotificationTab = this.notificationTabs$.subscribe((notificationTab) => {
			this.ngZone.run(() => {
				this.solicitudesList = this._taskOdoo.getSolicitudeList();
				
			});
			this.solicitudEmpty();
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

	solicitudEmpty(){
		if(typeof this.solicitudesList !== 'undefined' && this.solicitudesList.length > 0){
			
			this.solicitudVacia=false;
		}
		else{
			this.solicitudVacia =true;
		
		}  
	}

	in(i) {
		this.cant = i;
		this.subServ.setposicion(this.cant);
		this.task = this.solicitudesList[this.cant];
		this._taskOdoo.setTaskCesar(this.task);
		this.navCtrl.navigateRoot('/ofertas', { animated: true, animationDirection: 'forward' });
	}

	irSolicitud() {
		this.navCtrl.navigateRoot('/tarea', { animated: true, animationDirection: 'forward' });
	}

	async presentAlert() {
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

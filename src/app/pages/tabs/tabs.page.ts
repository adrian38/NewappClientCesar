import { Component, NgZone, OnInit, ViewChild } from '@angular/core';

import { TaskModel } from 'src/app/models/task.model';
import { TaskOdooService } from 'src/app/services/task-odoo.service';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { AlertController, IonTabs, LoadingController, NavController, Platform } from '@ionic/angular';
import { Observable, Subscription, Unsubscribable } from 'rxjs';

@Component({
	selector: 'app-tabs',
	templateUrl: 'tabs.page.html',
	styleUrls: [ 'tabs.page.scss' ]
})
export class TabsPage {
	@ViewChild('tabs') tabs: IonTabs;

	tab1_active: string = '';
	tab2_active: string = '';
	tab3_active: string = '';

	task: TaskModel;
	solicitudesList: TaskModel[];
	contratadosList: TaskModel[];
	historialList: TaskModel[];

	loading: any;

	tasksList$: Observable<TaskModel[]>; // servicio comunicacion

	notificationSoCancelled$: Observable<number>;
	notificationError$: Observable<boolean>;
	notificationNewOffertSuplier$: Observable<any>;
	notificationOffertCancelled$: Observable<number[]>;

	subscriptionNotificationSoCancelled: Subscription;
	subscriptionNotificationError: Subscription;
	subscriptiontasksList: Subscription;
	subscriptionNotificationNewOffertSuplier: Subscription;

	constructor(
		private _taskOdoo: TaskOdooService,
		private subServ: ObtSubSService,
		private ngZone: NgZone,
		public loadingController: LoadingController,
		public navCtrl: NavController,
		private platform: Platform,
		public alertCtrl: AlertController
	) {
		if (!this._taskOdoo.getInitTab()) {
			this._taskOdoo.setInitTab();
			this._taskOdoo.requestTaskListClient();
			this.presentLoading();
		} else if (!this._taskOdoo.getPilaEmpthy()) {
			let temp = this._taskOdoo.getPilaSolicitud();
			for (let newElement of temp) {
				this.solicitudesList = this.subServ.getSolicitudeList();

				switch (newElement.notificationType) {
					case 1:
						this.solicitudesList.unshift(newElement);
						this.subServ.setSolicitudeList(this.solicitudesList);
						break;
					case 2:
						let temp = this.solicitudesList.findIndex(
							(element) => element.id_string === newElement.id_string
						);
						if (temp != -1) {
							this.solicitudesList[temp].notificationOffert = true;
							this.subServ.setSolicitudeList(this.solicitudesList);
              
						}
						break;
				}
			}
		}
	}

	ngOnInit(): void {
		this._taskOdoo.setTab1In();
		this.observablesSubscriptions();
	}

	ngOnDestroy(): void {
		//Called once, before the instance is destroyed.
		//Add 'implements OnDestroy' to the class.
		this.subscriptionNotificationSoCancelled.unsubscribe();
		this.subscriptionNotificationError.unsubscribe();
		this.subscriptiontasksList.unsubscribe();
		this._taskOdoo.setTab1Out();
	}

	observablesSubscriptions() {
		////////////////////////////////Para el Cliente

		this.notificationNewOffertSuplier$ = this._taskOdoo.getRequestedNotificationNewOffertSuplier$();
		this.subscriptionNotificationNewOffertSuplier = this.notificationNewOffertSuplier$.subscribe((newOffert) => {
			this.ngZone.run(() => {
				let temp = this.solicitudesList.findIndex((element) => element.id_string === newOffert[0]['origin']);
				if (temp != -1) {
					this.solicitudesList[temp].notificationOffert = true;
					this.subServ.setSolicitudeList(this.solicitudesList);
				}
			});
		});

		this.notificationSoCancelled$ = this._taskOdoo.getNotificationSoCancelled$();
		this.subscriptionNotificationSoCancelled = this.notificationSoCancelled$.subscribe(
			(notificationSoCancelled) => {
				this.ngZone.run(() => {
					let temp = this.solicitudesList.findIndex((element) => element.id === notificationSoCancelled);
					if (temp !== -1) {
						this.solicitudesList.splice(temp, 1);
						this.subServ.setSolicitudeList(this.solicitudesList);
					}
				});
			}
		);
		//////////////////Para Todos
		this.notificationError$ = this._taskOdoo.getNotificationError$();
		this.subscriptionNotificationError = this.notificationError$.subscribe((notificationError) => {
			this.ngZone.run(() => {
				if (notificationError) {
					console.log('Error!!!!!!!!!!!');
				}
			});
		});

		this.tasksList$ = this._taskOdoo.getRequestedTaskList$();
		this.subscriptiontasksList = this.tasksList$.subscribe((tasksList: TaskModel[]) => {
			this.ngZone.run(() => {
				let temp: TaskModel[];
				temp = tasksList.filter((task) => {
					return task.state === 'to invoice'; //Solicitadas
				});
				if (typeof this.solicitudesList !== 'undefined' && this.solicitudesList.length > 0) {
					Array.prototype.push.apply(this.solicitudesList, temp);
				} else {
					this.solicitudesList = temp;
				}

				this.subServ.setSolicitudeList(this.solicitudesList);
				console.log(this.solicitudesList.length);
				this.subServ.set_cantidad_solicitud(this.solicitudesList.length);

				temp = tasksList.filter((task) => {
					return task.state === 'invoiced'; //Contratadas
				});
				if (typeof this.contratadosList !== 'undefined' && this.contratadosList.length > 0) {
					Array.prototype.push.apply(this.contratadosList, temp);
				} else {
					this.contratadosList = temp;
					this.historialList = temp;
				}

				this.subServ.setContratadosList(this.contratadosList);

				temp = tasksList.filter((task) => {
					return task.state === ''; //Historial
				});
				if (typeof this.historialList !== 'undefined' && this.historialList.length > 0) {
					Array.prototype.push.apply(this.historialList, temp);
				} else {
					this.historialList = temp;
				}

				this.subServ.setHistorialList(this.historialList);
				console.log(this.solicitudesList);
				this.loading.dismiss();
			});
		});
	}
	async presentLoading() {
		this.loading = await this.loadingController.create({
			cssClass: 'my-custom-class',
			message: 'Cargando Solicitudes...'
			//duration: 2000
		});
		return this.loading.present();
	}

	setCurrentTab(event) {
		let selectedTab = this.tabs.getSelected();

		if (selectedTab === 'tab1') {
			this.tab1_active = '_active';
			this.tab2_active = '';
			this.tab3_active = '';
			this.platform.backButton.subscribeWithPriority(10, () => {
				this.presentAlert();
			});
		} else if (selectedTab === 'tab2') {
			this.tab1_active = '';
			this.tab2_active = '_active';
			this.tab3_active = '';
			this.platform.backButton.subscribeWithPriority(10, () => {
				this.navCtrl.navigateRoot('/tabs/tab1', { animated: true, animationDirection: 'back' });
			});
		} else if (selectedTab === 'tab3') {
			this.tab1_active = '';
			this.tab2_active = '';
			this.tab3_active = '_active';
			this.platform.backButton.subscribeWithPriority(10, () => {
				this.navCtrl.navigateRoot('/tabs/tab1', { animated: true, animationDirection: 'back' });
			});
		}
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
}

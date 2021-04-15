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
	solicitudVacia:boolean=true;
	ss:number=0;

	notificationTabs$: Observable<boolean>;
	notificationSOCancelled$: Observable<number>;

	subscriptionNotificationSoCancel: Subscription;
	subscriptionNotificationTab: Subscription;

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
	) {
		this.solicitudesList = this.subServ.getSolicitudeList();
		console.log(this.subServ.get_cantidad_solicitud()) 
	 	
		
	
	}

	ngOnInit(): void {
		this.subServ.set_Detalles(false);
		this._taskOdoo.setTab1In();
		
		    this.subServ.setSolicitudeList(this.solicitudesList);
		    console.log("cambios1111",this.solicitudesList) 

		this.ss=this.subServ.get_cantidad_solicitud()

		this.platform.backButton.subscribeWithPriority(10, () => {
			this.loading.dismiss();
			this.presentAlert();
		});

	

		if(this.subServ.get_cantidad_solicitud() == 0){
			console.log(" NO hay solicitud",this.solicitudesList);
			this.solicitudVacia=true;

		}
		else{
			console.log("hay solicitud",this.solicitudesList);
			this.solicitudVacia=false;

		
			
		} 

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
				this.solicitudesList = this.subServ.getSolicitudeList();
				/* console.log("hay solicitud**"); */
			});
			/* console.log(" no hay solicitud !!!!!"); */
		});
	
	}

	ngOnDestroy(): void {
		//Called once, before the instance is destroyed.
		//Add 'implements OnDestroy' to the class.
		this.subscriptionNotificationTab.unsubscribe();
		this.subscriptionNotificationSoCancel.unsubscribe();

		this._taskOdoo.setTab1Out();
	}

	in(i) {
		this.cant = i;
		this.subServ.setposicion(this.cant);
		this.task = this.solicitudesList[this.cant];
		this.task.notificationNewSo=false;
		this._taskOdoo.setTaskCesar(this.task);
		 this.subServ.setSolicitudeList(this.solicitudesList); 
		/* this.solicitudesList = this.subServ.getSolicitudeList(); */
		console.log("tarea actual",this.task)
		console.log("todas las tareas",this.solicitudesList)
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

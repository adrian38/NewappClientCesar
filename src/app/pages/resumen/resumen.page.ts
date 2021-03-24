import { Component, NgZone, OnInit } from '@angular/core';
import { NavController, LoadingController, Platform } from '@ionic/angular';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { TaskOdooService } from 'src/app/services/task-odoo.service';
import { AuthOdooService } from 'src/app/services/auth-odoo.service';
import { Address, TaskModel } from '../../models/task.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { DatePipe } from '@angular/common';

//-----------------------------------------------
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { PhotoService } from '../../services/photo.service';
import { Observable, Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
	selector: 'app-resumen',
	templateUrl: './resumen.page.html',
	styleUrls: [ './resumen.page.scss' ]
})
export class ResumenPage implements OnInit {
	user: UsuarioModel;
	task: TaskModel;

	servicio: string = '';
	titulo: string;
	check: boolean;
	fecha: string;
	hora: string;
	hora1: Date;

	comentario: string;

	calle: string = '';
	piso: string = '';
	numero: string = '';
	puerta: string = '';
	portal: string = '';
	cod_postal: string = '';
	escalera: string = '';
	latitud: string = '';
	longitud: string = '';
	loading: any;

	notificationNewSoClient$: Observable<boolean>;
	notificationError$: Observable<boolean>;

	subscriptionNotificationNewSoClient: Subscription;
	subscriptionNotificationError: Subscription;
	subscriptionCerrar: Subscription;

	foto0: string = '';
	foto1: string = '';
	foto2: string = '';

	constructor(
		private datos: ObtSubSService,
		private date: DatePipe,
		private _taskOdoo: TaskOdooService,
		private ngZone: NgZone,
		public navCtrl: NavController,
		public photoService: PhotoService,
		public actionSheetController: ActionSheetController,
		private platform: Platform,
		private messageService: MessageService,
		public sanitizer: DomSanitizer,
		public alertCtrl: AlertController,
		public loadingController: LoadingController,
		private _authOdoo:AuthOdooService,
	) {}

	ngOnInit() {
		this.platform.backButton.subscribeWithPriority(10, () => {
			this.navCtrl.navigateRoot('/foto', { animated: true, animationDirection: 'back' });
		});

		/* this.foto0 = this.datos.getfoto00(); */
	/* 	this.foto1 = this.datos.getfoto11();
		this.foto2 = this.datos.getfoto22(); */

		if(this.datos.getfoto0()==""){
			console.log('en if foto0', this.datos.getfoto0());
			this.foto0 ='../../../assets/icon/noImage.svg'
		}
		else{
			this.foto0 = this.datos.getfoto00();
			console.log('no if foto0', this.datos.getfoto0());
		}

		if(this.datos.getfoto1()==""){
			console.log('en if foto0', this.datos.getfoto1());
			this.foto1 ='../../../assets/icon/noImage.svg'
		}
		else{
			this.foto1 = this.datos.getfoto11();
			console.log('no if foto0', this.datos.getfoto1());
		}

		if(this.datos.getfoto2()==""){
			console.log('en if foto0', this.datos.getfoto2());
			this.foto2 ='../../../assets/icon/noImage.svg'
		}
		else{
			this.foto2 = this.datos.getfoto22();
			console.log('no if foto0', this.datos.getfoto2());
		}
/* 
		console.log('tengoresumen la foto0', this.datos.getfoto0());
		console.log('tengoresumen la foto1', this.foto1);
		console.log('tengoresumen la foto2', this.foto2); */

		this.servicio = this.datos.getServ();

		this.titulo = this.datos.gettitulo();
		this.check = this.datos.getUtiles();
		this.fecha = this.datos.getCalendarioD();
		this.hora1 = this.datos.getCalendarioT();
		this.hora = this.date.transform(this.hora1, 'HH:mm:ss');

		this.comentario = this.datos.getcomentario();

		this.calle = this.datos.getcalle();
		this.portal = this.datos.getportal();
		this.puerta = this.datos.getpuerta();
		this.cod_postal = this.datos.getcod_postal();
		this.escalera = this.datos.getescalera();
		this.piso = this.datos.getpiso();
		this.numero = this.datos.getnumero();
		/*  this.longitud=this.datos.getlongitud().toString();
    this.latitud=this.datos.getlatitud().toString(); */

		this.user = this._authOdoo.getUser();

		this.notificationError$ = this._taskOdoo.getNotificationError$();
		this.subscriptionNotificationError = this.notificationError$.subscribe((notificationError) => {
			this.ngZone.run(() => {
				if (notificationError) {
					console.log('Error creando la tarea');
					this.loading.dismiss();
					this.messageService.add({ severity: 'error', detail: 'No se creo la tarea' });
				}
			});
		});

		this.notificationNewSoClient$ = this._taskOdoo.getNotificationNewSoClient$();
		this.subscriptionNotificationNewSoClient = this.notificationNewSoClient$.subscribe(
			(notificationNewSoClient) => {
				this.ngZone.run(() => {
					if (notificationNewSoClient) {
						this.loading.dismiss();
						console.log('Se creo correctamente la tarea');
						this.messageService.add({ severity: 'success', detail: 'Tarea creada correctamente' });
						/* this.messageService.add({ severity: 'success', summary: 'Completado', detail: 'Tarea creada correctamente'});
   */

						setTimeout(() => {
							this.navCtrl.navigateRoot('/tabs/tab1', { animated: true, animationDirection: 'forward' });
						}, 2000);
					}
				});
			}
		);
		//-----------------------
	}

	ngOnDestroy(): void {
		//Called once, before the instance is destroyed.
		//Add 'implements OnDestroy' to the class.
		this.subscriptionNotificationError.unsubscribe();
		this.subscriptionNotificationNewSoClient.unsubscribe();
		/*  this.subscriptionCerrar.unsubscribe();
      this.presentAlert(); */
	}

	cerrarsolicitud() {
		this.presentAlert();
	}
	crearSolicitud() {
		this.presentLoading();
		this.task = new TaskModel();
		this.task.address = new Address('', '', '', '', '', '', '', '', '');

		this.task.require_materials = this.datos.getUtiles();
		this.task.description = this.datos.getcomentario();

		this.task.address.street = this.datos.getcalle();
		this.task.address.door = this.datos.getpuerta();
		this.task.address.stair = this.datos.getescalera();
		this.task.address.portal = this.datos.getportal();
		this.task.address.cp = this.datos.getcod_postal();
		this.task.address.number = this.datos.getnumero();
		this.task.address.floor = this.datos.getpiso();

		this.task.address.latitude = String(this.datos.getlatitud());
		this.task.address.longitude = String(this.datos.getlongitud());

		this.task.title = this.datos.gettitulo();
		this.task.product_id = 39;
		this.task.type = ':Servicio de Fontaneria';

		this.task.date = this.fecha;
		this.task.time = this.hora;
		this.task.client_id = this.user.partner_id;

		// this.task.photoNewTaskArray[0]= this.photoService.devuelve64();

		if (this.datos.getfoto0()) {
			if (
				Buffer.from(this.datos.getfoto0().substring(this.datos.getfoto0().indexOf(',') + 1)).length / 1e6 >
				0.322216
			) {
				this.resizedataURL(this.foto0, 1280, 960, 0);
			} else {
				this.task.photoNewTaskArray[0] = this.datos
					.getfoto0()
					.substring(this.datos.getfoto0().indexOf(',') + 1);
			}
		}
		if (this.datos.getfoto1()) {
			if (
				Buffer.from(this.datos.getfoto1().substring(this.datos.getfoto1().indexOf(',') + 1)).length / 1e6 >
				0.322216
			) {
				this.resizedataURL(this.datos.getfoto1(), 1280, 960, 1);
			} else {
				this.task.photoNewTaskArray[1] = this.datos
					.getfoto1()
					.substring(this.datos.getfoto1().indexOf(',') + 1);
			}
		}

		if (this.datos.getfoto2()) {
			if (
				Buffer.from(this.datos.getfoto2().substring(this.datos.getfoto2().indexOf(',') + 1)).length / 1e6 >
				0.322216
			) {
				this.resizedataURL(this.datos.getfoto2(), 1280, 960, 2);
			} else {
				this.task.photoNewTaskArray[2] = this.datos
					.getfoto2()
					.substring(this.datos.getfoto2().indexOf(',') + 1);
			}
		}

		// console.log("f1",this.datos.getfoto0());

		//console.log("f2",this.datos.getfoto1());
		//console.log("f3",this.datos.getfoto2());

		//console.log('task', this.task);
		this.datos.setradiobuton(false);
		this._taskOdoo.newTask(this.task);

		this.borrar_campos();
		

		/*  53338707 */

		//time =  this.reloj.getHours().toString()+ ":"+ this.reloj.getMinutes().toString() + ":" + this.reloj.getSeconds().toString()
		//this.task.time = '12:12:12';
		// this.task.date = '2020-02-20'
		// this.task.date = this.date.transform(this.fecha, 'yyyy-MM-dd');
		// this.task.time = this.date.transform(this.reloj, 'HH:mm:ss');
		//this.task.date = this.fecha.getFullYear().toString() + "-" + (this.fecha.getMonth() +1).toString() + "-" +this.fecha.getDate().toString()
		//console.log("Vet",this.fecha.getDay+"-"+this.fecha.getFullYear().toString() + "-" + (this.fecha.getMonth() +1).toString() + "-" +this.fecha.getDate().toString());
		/* 
    this.task.address.latitude="4.44";
    this.task.address.longitude="4.43"; */
		// this.task.title= 'Arreglo'
	}

	borrar_campos() {
		this.datos.setTitulo('');

		this.datos.setcalle('');
		this.datos.setpuerta('');
		this.datos.setpiso('');
		this.datos.setescalera('');
		this.datos.setcod_postal('');
		this.datos.setnumero('');
		this.datos.setportal('');
		this.datos.setradiobuton(false);

		this.datos.setcomentario('');
 		 this.datos.setfoto00('../../../assets/fotoadd.png');
		this.datos.setfoto11('../../../assets/fotoadd.png');
		this.datos.setfoto22('../../../assets/fotoadd.png');  

		this.datos.setfoto0('');
		this.datos.setfoto1('');
		this.datos.setfoto2(''); 
	}

	verubicacion() {
		this.navCtrl.navigateRoot('/maparesumen', { animated: true, animationDirection: 'back' });
	}

	async presentAlert() {
		const alert = await this.alertCtrl.create({
			cssClass: 'my-custom-class',
			header: 'Alerta',
			message: 'Desea cancelar la solicitud',

			buttons: [
				{
					text: 'Cancelar',
					role: 'cancel',
					cssClass: 'secondary',
					handler: (blah) => {
						console.log('Confirm Cancel: blah');
					}
				},
				{
					text: 'Aceptar',
					handler: (datos) => {
						this.borrar_campos();
						this.navCtrl.navigateRoot('/tabs/tab1', { animated: true, animationDirection: 'forward' });
					}
				}
			]
		});

		await alert.present();
	}

	async presentLoading() {
		this.loading = await this.loadingController.create({
			cssClass: 'my-custom-class',
			message: 'Creando Solicitud...'
			//duration: 2000
		});
		console.log('Loading Ok');
		return this.loading.present();
	}

	resizedataURL(datas, wantedWidth, wantedHeight, index) {
		var img = document.createElement('img');
		img.src = datas;
		img.onload = () => {
			let canvas = document.createElement('canvas');
			let ctx = canvas.getContext('2d');
			canvas.width = wantedWidth;
			canvas.height = wantedHeight;
			ctx.drawImage(img, 0, 0, wantedWidth, wantedHeight);
			let temp = canvas.toDataURL('image/jpeg', [ 0.0, 1.0 ]);
			this.task.photoNewTaskArray[index] = temp.substring(temp.indexOf(',') + 1);
		};
	}
}

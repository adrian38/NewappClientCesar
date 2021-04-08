import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { Address } from '../../models/task.model';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { Photo } from 'src/app/interfaces/photo';
import { ToastController } from '@ionic/angular';


@Component({
	selector: 'app-registro',
	templateUrl: './registro.page.html',
	styleUrls: [ './registro.page.scss' ]
})
export class RegistroPage implements OnInit {
	oblidatorio: boolean = false;
	oblidatoriocorreo: boolean = false;
	oblidatoriopass: boolean = false;
	oblidatorioppass: boolean = false;
	oblidatoriotelefono: boolean = false;
	oblidatoriocalle: boolean = false;
	oblidatorionumero: boolean = false;
	obligatoriofoto: boolean = false;
	obligatorioGPS: boolean = false;

	imgResultBeforeCompress: string;
	imgResultAfterCompress: string;

	verFoto: boolean = false;
	verFotoInicial: boolean = true;

	usuario: UsuarioModel;
	address: Address;

	nombre: string = '';
	fecha: string = '';
	correo: string = '';
	pass: string = '';
	ppass: string = '';
	telefono: number = 0;
	calle: string = '';
	piso: string = '';
	numero: string = '';
	puerta: string = '';
	portal: string = '';
	cod_postal: string = '';
	escalera: string = '';
	fechactual: string = '';
	avatarusuario = '';
	avatarusuario64: string = '';
	calen: boolean = false;
	selectFoto: boolean = false;
	coordenadas: boolean = false;
	ccontra: boolean = false;

	constructor(
		public photoService: PhotoService,
		public datos: ObtSubSService,
		public navCtrl: NavController,
		public alertController: AlertController,
		private platform: Platform,
		public toastController: ToastController
	) {
		this.coordenadas = this.datos.getcoordenada();
		this.selectFoto = this.datos.getselectfoto();

	}

	ngOnInit() {
		this.obtener_campos();

		this.platform.backButton.subscribeWithPriority(10, () => {
			this.alert_atras();
		});
	}

	async presentAlertConfirm() {
		const alert = await this.alertController.create({
			cssClass: 'my-custom-class',
			header: '¿Desea colocar una foto?',
			message: 'Selecione la opcion de camara o galeria para la foto ',
			buttons: [
				{
					text: 'Camara',

					handler: async () => {
				
						let photo: Photo = await this.photoService.addNewToCamara();
						if (photo) {
							this.avatarusuario = photo.webviewPath;
							this.avatarusuario64 = this.photoService.devuelve64();
							this.selectFoto = true;
							this.datos.setselectfoto(true);
						
						}
					}
				},
				{
					text: 'Galeria',
					handler: async () => {
						this.photoService.photos = [];
						let photos: Photo[] = await this.photoService.addNewToGallery();

						if (photos.length == 1) {
							this.avatarusuario = photos[0].webviewPath;
							this.avatarusuario64 = this.photoService.devuelve64();
							this.selectFoto = true;
							this.datos.setselectfoto(true);
						}
					}
				},
				{
					text: 'Cancelar',
					role: 'cancel',
					cssClass: 'secondary',
					handler: (blah) => {
					
						this.avatarusuario = '../../../assets/registro.svg';
						this.avatarusuario64 = '';
						this.selectFoto = false;
						this.datos.setselectfoto(false);
					}
				}
			]
		});

		await alert.present();
	}

	iniciar() {
		this.entrar_campos();
		this.obligatorio();

		this.fechactual = new Date().getFullYear().toString();

		let fechalarga = this.fecha.slice(0, 10);
		let fechacorta = this.fecha.slice(0, 4);
		let fechavalida = Number(this.fechactual) - Number(fechacorta);

		if (
			this.nombre != '' &&
			this.fecha != '' &&
			this.correo != '' &&
			this.pass != '' &&
			this.ppass != '' &&
			String(this.telefono) != '' &&
			this.calle != '' &&
			this.numero != ''
		) {
			console.log('si los campos');
			if (this.selectFoto) {
				this.obligatoriofoto = false;

				if (fechavalida > 17) {
					if (this.pass == this.ppass) {
						this.calen = false;
						this.ccontra = false;

						this.datos.setfecha(fechalarga);

						if (this.coordenadas == true) {
							this.obligatorioGPS = true;
							this.navCtrl.navigateRoot('/aceptarregistro', {
								animated: true,
								animationDirection: 'forward'
							});
						} else {
							this.obligatorioGPS = true;
							this.ToastCoordenadas();
						}
					} else {
						this.calen = false;
						this.ccontra = true;
					}
				} else {
					this.calen = true;
					this.ccontra = false;
				}
			} else {
				this.obligatoriofoto = true;
				this.ToastFoto();
			}
		} else {
			this.ToastCampos();
		}
	}

	ubicacion() {
		this.entrar_campos();
		this.datos.setruta('registro');
		this.navCtrl.navigateRoot('/regismapa', { animated: true, animationDirection: 'forward' });
	}
	entrar_campos() {
		this.datos.setnombre(this.nombre.trim());
		this.datos.setcorreo(this.correo.trim().toLowerCase());
		this.datos.setcontraseña(this.pass);
		this.datos.setcontraseñaConfirmafa(this.ppass);
		this.datos.settelefono(this.telefono);
		this.datos.setcalle(this.calle.trim());
		this.datos.setpiso(this.piso);
		this.datos.setnumero(this.numero);
		this.datos.setpuerta(this.puerta);
		this.datos.setportal(this.portal);
		this.datos.setescalera(this.escalera);
		this.datos.setcod_postal(this.cod_postal);
		this.datos.setfoto0(this.avatarusuario64);
		this.datos.setfotoRegis(this.avatarusuario);
		this.datos.setfecha(this.fecha);
	}

	obtener_campos() {
		this.nombre = this.datos.getnombre().trim();
		this.correo = this.datos.getcorreo();
		this.correo = this.correo.toLowerCase().trim();
		this.pass = this.datos.getcontraseña();
		this.ppass = this.datos.getcontraseñaConfirmafa();
		this.telefono = this.datos.gettelefono();
		this.calle = this.datos.getcalle().trim();
		this.numero = this.datos.getnumero();
		this.piso = this.datos.getpiso();
		this.puerta = this.datos.getpuerta();
		this.portal = this.datos.getportal();
		this.escalera = this.datos.getescalera();
		this.cod_postal = this.datos.getcod_postal();
		this.coordenadas = this.datos.getcoordenada();
		this.avatarusuario = this.datos.getfotoRegis();
		this.fecha = this.datos.getfecha();
		this.selectFoto = this.datos.getselectfoto();
	}
	vaciar_campos() {
		this.datos.setnombre('');
		this.datos.setcorreo('');
		this.datos.setcontraseña('');
		this.datos.setcontraseñaConfirmafa('');
		this.datos.settelefono('');
		this.datos.setcalle('');
		this.datos.setpiso('');
		this.datos.setnumero('');
		this.datos.setpuerta('');
		this.datos.setportal('');
		this.datos.setescalera('');
		this.datos.setcod_postal('');
		this.datos.setfoto0('');
		this.datos.setfoto1('');
		this.datos.setfecha('');
	}

	async alert_atras() {
		const alert = await this.alertController.create({
			cssClass: 'my-custom-class',
			header: 'Alerta',
			message: 'Perderá todos los datos',
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
						this.vaciar_campos();
						this.navCtrl.navigateRoot('/inicio', { animated: true, animationDirection: 'back' });
					}
				}
			]
		});

		await alert.present();
	}

	async ToastFoto() {
		const toast = await this.toastController.create({
			message: 'Ingrese una foto',
			duration: 2000
		});
		toast.present();
	}

	async ToastCampos() {
		const toast = await this.toastController.create({
			message: 'Introduzca todos los campos',
			duration: 2000
		});
		toast.present();
	}

	async ToastCoordenadas() {
		const toast = await this.toastController.create({
			message: 'Indique su geolocalización',
			duration: 2000
		});
		toast.present();
	}

	obligatorio() {
		if (this.nombre != '') {
			this.oblidatorio = false;
		} else {
			this.oblidatorio = true;
		}

		if (this.fecha != '') {
			this.calen = false;
		} else {
			this.calen = true;
		}

		if (this.correo != '') {
			this.oblidatoriocorreo = false;
		} else {
			this.oblidatoriocorreo = true;
		}
		if (this.pass != '') {
			this.oblidatoriopass = false;
		} else {
			this.oblidatoriopass = true;
		}
		if (this.ppass != '') {
			this.oblidatorioppass = false;
		} else {
			this.oblidatorioppass = true;
		}
		if (this.calle != '') {
			this.oblidatoriocalle = false;
		} else {
			this.oblidatoriocalle = true;
		}
		if (this.numero != '') {
			this.oblidatorionumero = false;
		} else {
			this.oblidatorionumero = true;
		}

		if (this.telefono > 1) {
			this.oblidatoriotelefono = false;
		} else {
			this.oblidatoriotelefono = true;
		}
	}
}

import { Component, OnInit } from '@angular/core';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { MessageService } from 'primeng/api';
@Component({
	selector: 'app-contrase',
	templateUrl: './contrase.page.html',
	styleUrls: [ './contrase.page.scss' ]
})
export class ContrasePage implements OnInit {
	cambiada: string = '';
	confirmada: string = '';
	confirmacion_pass:boolean = false;
	campos_vacios:boolean = false;

	constructor(public navCtrl: NavController, 
		        private platform: Platform, 
				private messageService: MessageService,
				public toastController: ToastController) {}

	ngOnInit() {
		this.platform.backButton.subscribeWithPriority(10, () => {
			this.navCtrl.navigateRoot('/tabs/tab3', { animated: true, animationDirection: 'back' });
		});
	}

	iniciar() {
 

		if (this.cambiada == "" || this.confirmada == ""){
			this.campos_vacios=true;
			this.confirmacion_pass=true;
			this.toast_error_contraseña();
		}
		else{
			this.campos_vacios=false;
			if (this.cambiada == this.confirmada) {
				// this.messageService.add({ severity: 'success', detail: 'completo' });
				console.log('todo bien')
				this.confirmacion_pass=false;
			} else {
				// this.messageService.add({ severity: 'error', detail: 'Contraseña incorrecta' });
				console.log('todo mal')
				this.toast_error_contraseña();
				this.confirmacion_pass=true;
				
			}
		}

		
	}

	async toast_error_contraseña() {
		const toast = await this.toastController.create({
			message: 'Verifique los campos ',
			duration: 2000
		});
		toast.present();
	}
}

import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { MessageService } from 'primeng/api';
@Component({
	selector: 'app-contrase',
	templateUrl: './contrase.page.html',
	styleUrls: [ './contrase.page.scss' ]
})
export class ContrasePage implements OnInit {
	passnueva: string = '';
	passconfirmada: string = '';
	t: string = 'Contraseña';

	constructor(public navCtrl: NavController, private platform: Platform, private messageService: MessageService) {}

	ngOnInit() {
		this.platform.backButton.subscribeWithPriority(10, () => {
			this.navCtrl.navigateRoot('/tabs/tab3', { animated: true, animationDirection: 'back' });
		});
	}

	aceptar() {
		if (this.passnueva == this.passconfirmada) {
			this.messageService.add({ severity: 'success', detail: 'completo' });
		} else {
			this.messageService.add({ severity: 'error', detail: 'Contraseña incorrecta' });
		}
	}
}

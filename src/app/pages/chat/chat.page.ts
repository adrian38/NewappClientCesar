import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { IonContent, LoadingController, MenuController, NavController, Platform } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { MessageModel } from 'src/app/models/message.model';
import { TaskModel } from 'src/app/models/task.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthOdooService } from 'src/app/services/auth-odoo.service';
import { ChatOdooService } from 'src/app/services/chat-odoo.service';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { PhotoService } from 'src/app/services/photo.service';
import { TaskOdooService } from 'src/app/services/task-odoo.service';


@Component({
	selector: 'app-chat',
	templateUrl: './chat.page.html',
	styleUrls: [ './chat.page.scss' ]
})
export class ChatPage implements OnInit {
	/* @ViewChild("content") content:any; */

	purchaseOrderID: number;
	fecha: Date;
	reloj: Date;
	displayAdjunto: boolean = false;
	foto: string = '';
	foto64: string = '';
	fo: boolean = false;

	task: TaskModel;

	message: MessageModel;
	messagesList: MessageModel[];

	messagesList$: Observable<MessageModel[]>;
	messageSendOk$: Observable<MessageModel>;
	task$: Observable<TaskModel[]>;
	notificationNewMessg$: Observable<number[]>;

	subscriptionMessList: Subscription;
	subscriptionNewMsg: Subscription;
	subscriptionNotification: Subscription;
	subscriptionTask: Subscription;

	user: UsuarioModel;

	loading: HTMLIonLoadingElement = null;

	fotoTemporal: string = ' ';


	@ViewChild(IonContent) content: IonContent;
	@ViewChild('target') private myScrollContainer: ElementRef;

	ultimo_sms:string="";
	sms_cliente:string="";
	constructor(
		private _authOdoo: AuthOdooService,
		private _taskOdoo: TaskOdooService,
		private _chatOdoo: ChatOdooService,
		public navCtrl: NavController,
		private datos: ObtSubSService,
		private menu: MenuController,
		private ngZone: NgZone,
		private platform: Platform,
		public photoService: PhotoService,
		public loadingController: LoadingController
	) {
		this.task = new TaskModel();

		this.task = this._taskOdoo.getTaskCesar();
		this.user = this._authOdoo.getUser();
		this.message = new MessageModel();
		this.messagesList = [];

		this.purchaseOrderID = this._chatOdoo.getIdPo();
		this._taskOdoo.requestTask(this.purchaseOrderID);
		this._chatOdoo.requestAllMessages(this.purchaseOrderID);
	}

	ngOnInit(): void {

		this._taskOdoo.setChat(true);
		this.presentLoading();

		this.platform.backButton.subscribeWithPriority(10, () => {
			this.navCtrl.navigateRoot('/ofertas', { animated: true, animationDirection: 'back' });
		});

		this.messageSendOk$ = this._chatOdoo.getRequestedNotificationSendMessage$();
		this.subscriptionNewMsg = this.messageSendOk$.subscribe((messageSendOk) => {
			this.ngZone.run(() => {
				if (messageSendOk.offer_id === this.purchaseOrderID) {
					messageSendOk.author = this.user.realname;
					messageSendOk.author_id = this.user.partner_id;
					this.messagesList.push(messageSendOk);
				}
			});
		});

		this.notificationNewMessg$ = this._taskOdoo.getRequestedNotificationNewMessg$();
		this.subscriptionNotification = this.subscriptionNotification = this.notificationNewMessg$.subscribe(
			(notificationNewMessg) => {
				this.ngZone.run(() => {
					this._chatOdoo.requestNewMessage(notificationNewMessg);
				});
			}
		);

		this.messagesList$ = this._chatOdoo.getAllMessages$();
		this.subscriptionMessList = this.messagesList$.subscribe((messagesList) => {
			this.ngZone.run(() => {
				this.loading.dismiss();
				
				let temp = messagesList.find((element) => element.offer_id);
				if (temp) {
					if (this.purchaseOrderID === temp.offer_id) {
						if (typeof this.messagesList !== 'undefined' && this.messagesList.length > 0) {
							Array.prototype.push.apply(this.messagesList, messagesList);
						} else {
							this.messagesList = messagesList;
						}
					}
				}
			});
		});

		this.task$ = this._taskOdoo.getRequestedTask$();
		this.subscriptionTask = this.task$.subscribe((task) => {
			this.ngZone.run(() => {
				let temp = task.find((element) => element.id);
				if (this.purchaseOrderID === temp.id) this.task = temp;
			});
		});

		
	}

	ngOnDestroy(): void {
		//Called once, before the instance is destroyed.
		//Add 'implements OnDestroy' to the class.
	     	this.subscriptionMessList.unsubscribe();
		this.subscriptionNewMsg.unsubscribe();
		     this.subscriptionNotification.unsubscribe();
		  this.subscriptionTask.unsubscribe();
		this._taskOdoo.setChat(false);
	}

	// enviarSMS() {
		
	

	// 	    if(this.message.message.length){
    // this.message.offer_id = this.purchaseOrderID;
    // console.log(this.message);
    // this._chatOdoo.sendMessageClient(this.message);
    // this.message = new MessageModel();
   
    // }    
	// 	if (this.message.message.length || this.fo) {
	// 		this.message.offer_id = this.purchaseOrderID;
	// 		this.message.foto = this.foto64;
	// 		this._chatOdoo.sendMessageClient(this.message);
	// 		this.message = new MessageModel();
	// 	}
	// }

	cerrarsolicitud() {
		this.navCtrl.navigateRoot('/ofertas', { animated: true, animationDirection: 'forward' });
	}
	openFirst() {
		this.menu.enable(true, 'first');
		this.menu.open('first');
	}

	// actualizar() {
	// 	 this.datos.setCalendarioD(String(this.fecha));
    // this.datos.setCalendarioT(String(this.reloj));
	// 	  this.task.date=(String(this.fecha));
    // this.task.time==(String(this.reloj)); 
	// }

	// adjuntar() {
	// 	this.displayAdjunto = true;
	// }

	async presentLoading() {
		this.loading = await this.loadingController.create({
			cssClass: 'my-custom-class',
			message: 'Espere...'
			//duration: 2000
		});

		return this.loading.present();
	}


	pushToChat() {

		if (this.message.message.length > 0) {
			this.message.offer_id = this.task.id;
	
		
		  this._chatOdoo.sendMessageClient(this.message);
		  this.ultimo_sms=this.message.message;
		  console.log('´sms mandado', this.message.message);
		  this.message = new MessageModel();
		  this.coger();
		}
	
	   /*  setTimeout(() => {
		  this.content.scrollToBottom(300);
		}, 500);
	
		this.message.message= ''; */
	}
	
	 scrollToElement(): void {
	  this.myScrollContainer.nativeElement.scroll({
		top: this.myScrollContainer.nativeElement.scrollHeight,
		left: 0,
		behavior: 'smooth'
	  });
	} 

	coger(){
		// console.log('ultimo sms',this.messagesList[0].message )
		//  console.log('ultimo sms',this.messagesList[0].author_id )
		//  console.log('ultimovvv sms',this.user.partner_id )
	
	for (let i = 0; i <  this.messagesList.length; i++) {
	
	if(this.messagesList[i].author_id != this.user.partner_id ){
		 this.sms_cliente = this.messagesList[i].message;
		 console.log('ultimo sms temporal', this.sms_cliente);
	}
	else{
	console.log('nooooo');
	}
	
	} 
	
	 this.scrollToBottom(); 
	
	}
	scrollToBottom(){

			
		setTimeout(() => {
			this.scrollToElement();
		}, 400);
	  
		
	  } 

	  onClose() {
		
		this.navCtrl.navigateRoot('/ofertas', {animated: true, animationDirection: 'back' }) ;
	  }
}

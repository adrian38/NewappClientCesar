 import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, MenuController, NavController, Platform } from '@ionic/angular';
import { Buffer } from 'buffer';
import { Observable, Subscription } from 'rxjs';
import { Photo } from 'src/app/interfaces/photo';
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
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  purchaseOrderID: number;
  fecha:Date ;
  reloj:Date;
  displayAdjunto:boolean=false;
  foto:string = "";

  subscriptionMessList: Subscription;
  subscriptionNewMsg: Subscription;
  subscriptionNotification: Subscription;
  subscriptionTask: Subscription;

  task: TaskModel;
  task$: Observable<TaskModel[]>;
  message: MessageModel;
  messagesList: MessageModel[];
  messagesList$: Observable<MessageModel[]>;
  messageSendOk$: Observable<MessageModel>;
  user: UsuarioModel
  usuario$: Observable<UsuarioModel>
  notificationNewMessg$: Observable<number[]>;

  loading:HTMLIonLoadingElement = null;

  fotoTemporal:string=" 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"

  constructor(private _authOdoo: AuthOdooService,
    private _taskOdoo: TaskOdooService,
    private _chatOdoo: ChatOdooService,
    public navCtrl:NavController,
    private datos:ObtSubSService,
    private menu: MenuController,
    private ngZone: NgZone,
    private platform: Platform,
    public photoService: PhotoService,
    public loadingController: LoadingController) {


    this.task = new TaskModel();
    
    this.task =this._taskOdoo.getTaskCesar();
    this.user = this._authOdoo.getUser();
    this.message = new MessageModel();
    this.messagesList = [];

    
    this.purchaseOrderID = this._chatOdoo.getIdPo()
    console.log(this.purchaseOrderID) ;
    console.log(this.task) ;

    this._taskOdoo.requestTask(this.purchaseOrderID);
    this._chatOdoo.requestAllMessages(this.purchaseOrderID);

   
  }

  ngOnInit(): void {

     this.presentLoading();

    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot('/ofertas', {animated: true, animationDirection: 'back' }) ;
        
      });

    this.messageSendOk$ = this._chatOdoo.getRequestedNotificationSendMessage$();
    this.subscriptionNewMsg = this.messageSendOk$.subscribe(messageSendOk =>{
    this.ngZone.run(() => {
        console.log ("mande mensaje");
        if(messageSendOk.offer_id ===this.purchaseOrderID){
        messageSendOk.author = this.user.realname;
        messageSendOk.author_id = this.user.partner_id;
        console.log(messageSendOk);
        this.messagesList.push(messageSendOk);
        }
      
    });

  }); 

  this.notificationNewMessg$ = this._taskOdoo.getRequestedNotificationNewMessg$();
  this.subscriptionNotification = this.subscriptionNotification = this.notificationNewMessg$.subscribe(notificationNewMessg => {

    this.ngZone.run(() => {
        console.log(notificationNewMessg, "idMessage");
       this._chatOdoo.requestNewMessage(notificationNewMessg);
    });

  });

  this.messagesList$ = this._chatOdoo.getAllMessages$();
  this.subscriptionMessList=this.messagesList$.subscribe(messagesList => {
    this.ngZone.run(() => {
      console.log ("recibi todo los mensajes");
      this.loading.dismiss();
      let temp = (messagesList.find(element => element.offer_id));
      if (temp) {

        if (this.purchaseOrderID === temp.offer_id) {
          if (typeof this.messagesList !== 'undefined' && this.messagesList.length > 0) {
            Array.prototype.push.apply(this.messagesList, messagesList);
          } else { this.messagesList = messagesList; 
            console.log(this.messagesList);}
        }
      }
    });
  });

  this.task$ = this._taskOdoo.getRequestedTask$();
   this.subscriptionTask=this.task$.subscribe(task => {
    console.log ("Obtuve la tarea");
    this.ngZone.run(() => {
      let temp = (task.find(element => element.id));
      if (this.purchaseOrderID === temp.id)
        this.task = temp;
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
  }

  enviarSMS() {

 
    console.log("foto",Buffer.from(this.fotoTemporal));
    if(this.message.message.length){
    this.message.offer_id = this.purchaseOrderID;
    console.log(this.message);
    this._chatOdoo.sendMessageClient(this.message);
    this.message = new MessageModel();
    }  

    
      
  }

  
  cerrarsolicitud(){
    this.navCtrl.navigateRoot('/ofertas', {animated: true, animationDirection: 'forward' }) ;
      
  
  }
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  actualizar(){
    /* this.datos.setCalendarioD(String(this.fecha));
    this.datos.setCalendarioT(String(this.reloj)); */
    
  /*   this.task.date=(String(this.fecha));
    this.task.time==(String(this.reloj)); */
 
  }

  adjuntar(){
   this.displayAdjunto=true;
  }

  documento(){
    console.log("documento")
  }
  async camara(){
    console.log("camara")
    let photo: Photo = await this.photoService.addNewToCamara();
    console.log( "Foto",photo.webviewPath);
    if(photo){
      this.foto = photo.webviewPath;
     
      //this.datos.setfoto0(this.foto0);
      /* this.foto064=this.photoService.devuelve64();
      this.datos.setfoto0(this.foto064);
      console.log("paso..../",this.photoService.devuelve64());
      console.log("mi foto",this.foto0); */
     
    }
    this.displayAdjunto=false;
  }
  async galeria(){
    console.log("galeria")
    let photos: Photo[] = await this.photoService.addNewToGallery();
    console.log("Fotos",JSON.stringify(this.photoService.photos));
    if(photos.length == 1){
     
        this.foto = photos[0].webviewPath;
        /* this.foto064=this.photoService.devuelve64();
        this.datos.setfoto0(this.foto064);
        console.log("paso..../",this.photoServ */
        
        
      
  }
  this.displayAdjunto=false;
}

async presentLoading() {
  this.loading = await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Espere...',
    //duration: 2000
  });
  console.log("Loading Ok");
  return  this.loading.present();
}

base64ToArrayBuffer(base64) {

  var binary_string = window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
  }
  console.log(bytes.buffer);
  return bytes.buffer;
  
}



}
 

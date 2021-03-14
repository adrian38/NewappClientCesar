 import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
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
  
  /* @ViewChild("content") content:any; */ 

  purchaseOrderID: number;
  fecha:Date ;
  reloj:Date;
  displayAdjunto:boolean=false;
  foto:string = '';
  foto64:string = '';
  fo:boolean=false;

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

  fotoTemporal:string=" ";
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
      /* this.scrollToend(); */
      let temp = (messagesList.find(element => element.offer_id));
      if (temp) {

        if (this.purchaseOrderID === temp.offer_id) {
          if (typeof this.messagesList !== 'undefined' && this.messagesList.length > 0) {
            Array.prototype.push.apply(this.messagesList, messagesList);
            console.log("hhhh",this.messagesList)
        
            

          } else { this.messagesList = messagesList; 
            console.log(this.messagesList);
           }
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

   /*  this.scrollToend(); */
    
 /*    if(this.message.message.length){
    this.message.offer_id = this.purchaseOrderID;
    console.log(this.message);
    this._chatOdoo.sendMessageClient(this.message);
    this.message = new MessageModel();
   
    }    */
    if(this.message.message.length || this.fo){
      this.message.offer_id = this.purchaseOrderID;
      this.message.foto=this.foto64;
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
              this.datos.setfoto00(this.foto);
              /* console.log(this.servicio); */
              this.foto64=this.photoService.devuelve64();
              this.datos.setfoto0(this.foto64);


             /*  console.log("paso..../",this.photoService.devuelve64()); */
              console.log("mi foto",this.foto);
              console.log("mi foto 64",this.foto64);
    }
    this.displayAdjunto=false;
    this.fo=true;
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
 
/* scrollToend(){
  let contentEnd=document.getElementById("contentend").offsetTop;
  this.content.scrollTo(0,contentEnd,300);
  console.log(contentEnd)
} */ 

}
 

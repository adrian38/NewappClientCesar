import { Component, OnInit ,NgZone, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform, IonSegment, LoadingController} from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { TaskModel } from 'src/app/models/task.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthOdooService } from 'src/app/services/auth-odoo.service';
import { ChatOdooService } from 'src/app/services/chat-odoo.service';
import { TaskOdooService } from 'src/app/services/task-odoo.service';
import {MessageService} from 'primeng/api';
import { LightboxModule } from 'primeng/lightbox';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';



@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.page.html',
  styleUrls: ['./ofertas.page.scss'],
})
export class OfertasPage implements OnInit {

  @ViewChild (IonSegment) segment: IonSegment;

  val: number;
  userType:string="";
  user : UsuarioModel;
  task: TaskModel;
  foto0:string = '../../../assets/icon/noImage.svg';
   
  offersList:TaskModel[];

  
  offersList$: Observable<TaskModel[]>;
  notificationOffertCancelled$: Observable<number[]>;
  notificationNewOffertSuplier$: Observable<number[]>;

  subscriptionOffersList: Subscription;
  subscriptionOffertCancelled: Subscription;
  subscriptioNewPoSuplier: Subscription;



  veroferta:boolean=true;
  verdetalles:boolean=false;
  valorSegment:string="";
  showSubCard = false;
  ofertaDisponible=false;
  

  display: boolean = false;
  displayAceptar: number;
  fotoZoom: boolean = false;
  loading:HTMLIonLoadingElement = null;
  
  displayBasic2;
  images:any[];
  activeIndex ;

  constructor(
    public navCtrl:NavController,
    private _taskOdoo:TaskOdooService,
    private _authOdoo:AuthOdooService,
    private ngZone: NgZone,
    private _chatOdoo: ChatOdooService,
    private platform: Platform,
    private messageService: MessageService,
    private router:Router,
    public loadingController: LoadingController,
    private _lightbox: LightboxModule,
    private subServ: ObtSubSService) {


      this.task=new TaskModel();
      this.task=this._taskOdoo.getTaskCesar();
     
      
this.veroferta=true;
this.verdetalles=false;




this.user = this._authOdoo.getUser();
this.offersList =[];
this.userType = this.user.type


}

ngOnDestroy(): void {

  this.subscriptioNewPoSuplier.unsubscribe();
  this.subscriptionOffersList.unsubscribe();
  this.subscriptionOffertCancelled.unsubscribe();

}

ngOnInit() {

  

  this.platform.backButton.subscribeWithPriority(10, () => {
    this.navCtrl.navigateRoot('/tabs/tab1', {animated: true, animationDirection: 'back' }) ;
      
    });
 
  setTimeout(()=>{
    console.log("ejecutando marcar 'contratados'");
    this.segment.value = 'ofertas';
  }, 100);

  this.notificationOffertCancelled$ = this._taskOdoo.getRequestedNotificationOffertCancelled$();
  this.subscriptionOffertCancelled = this.notificationOffertCancelled$.subscribe(notificationOffertCancelled => {
    this.ngZone.run(() => {


      if (typeof this.offersList !== 'undefined' && this.offersList.length > 0) {
        for (let Po_id of notificationOffertCancelled) {

          let temp = this.offersList.findIndex(element => element.id === Po_id);
          if (temp !== -1) {
            this.offersList.splice(temp, 1);
            
          }

        }

      }
    });

  });

  this.notificationNewOffertSuplier$ = this._taskOdoo.getRequestedNotificationNewOffertSuplier$();
  this.subscriptioNewPoSuplier = this.notificationNewOffertSuplier$.subscribe(notificationNewOffertSuplier=>{
    this.ngZone.run(()=>{

/*           for (let Po_id of notificationNewOffertSuplier) {

          ////////como asocio una po con un task
  
      } */

      console.log("nueva oferta ha llegado")
      
    });
  });



this.offersList$ = this._taskOdoo.getOffers$();
this.subscriptionOffersList = this.offersList$.subscribe(offersList => {

  this.ngZone.run(() => {


    if ((offersList.findIndex(element => element.origin === this.task.id_string) !== -1)) {

      ////Parar cargando
       this.loading.dismiss(); 
      
      if (offersList[0].budget !== 0) {
        this.offersList = offersList;
      
        this.showSubCard = true;
        this.ofertaDisponible=false;
      }
      else {
       // this.showSubCard = false;
        console.log("No tienes Ofertas");
        this.messageService.add({ key: 'c',severity: 'error', summary: 'Disculpe', detail: 'Todavia no hay ofertas.' });
        this.showSubCard = false;
        this.ofertaDisponible=true;
      }
      
    }
  });
});

}




segChange(event){
  this.valorSegment = event.detail.value;
  console.log(this.valorSegment);

  if(this.valorSegment==="ofertas"){
   
    this.veroferta=true;
    this.verdetalles=false;
    console.log("etiqueta",this.veroferta);

    ///// Sacar cargando
     this.presentLoading();
 this._taskOdoo.requestOffersForTask(this.task.id_string);

   
  }
  
  if(this.valorSegment==="detalle"){
    this.veroferta=false;
    this.verdetalles=true;
    this.displayAceptar=-1;
    console.log("etiqueta",this.verdetalles);
  }

 

 
}

openChat(id) {
  console.log(id);
  this.displayAceptar=-1;
  this._chatOdoo.setIdPo(id);
  this.navCtrl.navigateRoot(['/chat'], {animated: true, animationDirection: 'back' }) ;
  
 //this.router.navigate(['/chat']);
}

verubicacion(){
  console.log("lati",this.task.address.latitude);
  console.log("long",this.task.address.longitude);
  this.subServ.setruta("/ofertas");
  this.navCtrl.navigateRoot('/detallemapa', {animated: true, animationDirection: 'back' }) ;
         
}

showDialog(i){
  console.log(i);
  this.displayAceptar=-1;
    this.subServ.setposicion(i);

    this.task = this.offersList[i];
    this._taskOdoo.setTaskCesar(this.task);
    console.log(this.task);
    // console.log("f",this.solicitudesList[this.cant].id_string);
   /*  this.id_string = this.offersList[i].id_string;
    this.subServ.setidString(this.id_string);
 */

  this.display=true;
}

cancelSOclient() {

  console.log("CancelarSo");
  this.displayAceptar=-1;
  this._taskOdoo.cancelSOclient(this.task.id);
  //this.isLoading3 = true;
}
showDialogAceptar(id){
  console.log("aki",id)

 /*  this.subServ.setposicion(id);

  this.task = this.offersList[id];
  this._taskOdoo.setTaskCesar(this.task);
  console.log(this.task); */
  this.displayAceptar=id;
 
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


imageClick(index: number) {
  this.activeIndex = index;
  this.foto0=this.task.photoNewTaskArray[index];
  this.displayBasic2 = true;
  
}

}

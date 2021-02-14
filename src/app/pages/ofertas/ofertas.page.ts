import { Component, OnInit ,NgZone, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform, IonSegment, LoadingController,ModalController} from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { TaskModel } from 'src/app/models/task.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthOdooService } from 'src/app/services/auth-odoo.service';
import { ChatOdooService } from 'src/app/services/chat-odoo.service';
import { TaskOdooService } from 'src/app/services/task-odoo.service';
import {MessageService} from 'primeng/api';
import { LightboxModule } from 'primeng/lightbox';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';

import {ImagenmodalPage} from '../imagenmodal/imagenmodal.page';
import { Modals } from '@capacitor/core';

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
  habilitar1:boolean=false;
  habilitar2:boolean=false;
  habilitar3:boolean=false;

  
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
  
 /*  displayBasic2;
  images:any[];
  activeIndex ;  */

  imagenes:string[]=[];

  efectivo:boolean=false;
  desplegar:boolean=false;

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
    private subServ: ObtSubSService,
    private modalCtrl:ModalController) {


      this.task=new TaskModel();
 
      this.veroferta=true;
      this.verdetalles=false;



}

ngOnDestroy(): void {

  this.subscriptioNewPoSuplier.unsubscribe();
  this.subscriptionOffersList.unsubscribe();
  this.subscriptionOffertCancelled.unsubscribe();

}

ngOnInit() {
  this.user = this._authOdoo.getUser();
  this.task=this._taskOdoo.getTaskCesar();
  this.offersList =[];
  this.userType = this.user.type
  
  this.deshabilitar1();
  this.deshabilitar2();
  this.deshabilitar3();
 
  
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
if(this.desplegar==false){
  this.displayAceptar=id;
  this.desplegar=true;
}
else{
  this.displayAceptar=-1;
  this.desplegar=false;
}
 /*  this.subServ.setposicion(id);

  this.task = this.offersList[id];
  this._taskOdoo.setTaskCesar(this.task);
  console.log(this.task); */
  
 
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


/* imageClick(index: number) {
  this.activeIndex = index;
  this.foto0=this.task.photoNewTaskArray[index];
  this.displayBasic2 = true;
  
} */

imageClick(imagen){
this.modalCtrl.create({
  component : ImagenmodalPage,
  componentProps :{
    imagen:imagen
  }
}).then(modal => modal.present() )
}

editnombre(name){
  let nombre=name.split(' ');
return nombre[0] + ' ' + nombre[1].slice(0,1) + '.';
}

seleccionado(){
if(this.efectivo==true){
  this.efectivo=false;
}
else
this.efectivo=true;

}
deshabilitar1(){
  if(this.task.photoNewTaskArray[0]== undefined ){
this.habilitar1=true;
console.log("f1",this.task.photoNewTaskArray[0]);
console.log("h1",this.habilitar1);

  }
  else{
    this.habilitar1=false;
    console.log("f1",this.task.photoNewTaskArray[0])
    console.log("h1",this.habilitar1);
  }

}

deshabilitar2(){
  if(this.task.photoNewTaskArray[1]== undefined){
this.habilitar2=true;
console.log("f2",this.task.photoNewTaskArray[1])
console.log("h2",this.habilitar2);

  }
  else{
    this.habilitar2=false;
    console.log("f2",this.task.photoNewTaskArray[1])
    console.log("h2",this.habilitar2);
  }
 
}

deshabilitar3(){
  if(this.task.photoNewTaskArray[2]==undefined){
this.habilitar3=true;
console.log("f3",this.task.photoNewTaskArray[2])

  }
  else
  this.habilitar3=false;
  console.log("f3",this.task.photoNewTaskArray[2])
} 
}

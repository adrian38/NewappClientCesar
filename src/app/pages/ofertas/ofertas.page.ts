import { Component, OnInit ,NgZone, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform, IonSegment} from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { TaskModel } from 'src/app/models/task.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthOdooService } from 'src/app/services/auth-odoo.service';
import { ChatOdooService } from 'src/app/services/chat-odoo.service';
import { TaskOdooService } from 'src/app/services/task-odoo.service';
import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.page.html',
  styleUrls: ['./ofertas.page.scss'],
})
export class OfertasPage implements OnInit {

  @ViewChild (IonSegment) segment: IonSegment;

  userType:string="";
  user : UsuarioModel;
  task: TaskModel;

  offersList:TaskModel[];
  offersList$: Observable<TaskModel[]>;
  notificationOffertCancelled$: Observable<number[]>;
  notificationNewOffertSuplier$: Observable<number[]>;

  veroferta:boolean=true;
  verdetalles:boolean=false;
  valorSegment:string="";

  showSubCard = false;
  subscriptionOffersList: Subscription;

  constructor(
    public navCtrl:NavController,
    private _taskOdoo:TaskOdooService,
    private _authOdoo:AuthOdooService,
    private ngZone: NgZone,
    private _chatOdoo: ChatOdooService,
    private platform: Platform,
    private messageService: MessageService,
    private router:Router) {


this.veroferta=true;
this.verdetalles=false;


this.user = this._authOdoo.getUser();
this.offersList =[];
this.userType = this.user.type

this.platform.backButton.subscribeWithPriority(10, () => {
  this.navCtrl.navigateRoot('/tabs/tab1', {animated: true, animationDirection: 'back' }) ;
    
  });


}


ngOnInit() {

  //this.segment.value = 'ofertas';
  

  this.notificationOffertCancelled$ = this._taskOdoo.getRequestedNotificationOffertCancelled$();
  this.notificationOffertCancelled$.subscribe(notificationOffertCancelled => {
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
  this.notificationNewOffertSuplier$.subscribe(notificationNewOffertSuplier=>{

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
      if (offersList[0].budget !== 0) {
        this.offersList = offersList;
      
        this.showSubCard = true;
      }
      else {
        this.showSubCard = false;
        console.log("No tienes Ofertas");
        this.messageService.add({ key: 'c',severity: 'error', summary: 'Disculpe', detail: 'Todavia no hay ofertas.' });
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

 this.task=new TaskModel();
 this.task=this._taskOdoo.getTaskCesar();
 

 this._taskOdoo.requestOffersForTask(this.task.id_string);

   
  }
  
  if(this.valorSegment==="detalle"){
    this.veroferta=false;
    this.verdetalles=true;
    console.log("etiqueta",this.verdetalles);
  }

 

 
}

openChat(id) {
  console.log(id);
  this._chatOdoo.setIdPo(id);
  //this.navCtrl.navigateRoot(['/chat'], {animated: true, animationDirection: 'back' }) ;
  
 this.router.navigate(['/chat']);
}

}

import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { TaskModel } from 'src/app/models/task.model';
import { TaskOdooService } from 'src/app/services/task-odoo.service';
import { AuthOdooService } from 'src/app/services/auth-odoo.service';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { AlertController, IonTabs, LoadingController, NavController, Platform } from '@ionic/angular';
import { Observable,Subscription,Unsubscribable } from 'rxjs';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  @ViewChild('tabs') tabs: IonTabs;

  tab1_active: string = "";
  tab2_active: string = "";
  tab3_active: string = "";

  task: TaskModel;
  solicitudesList: TaskModel[];
  contratadosList: TaskModel[];
  historialList: TaskModel[];
  notificationNewPoSuplier: number[];
  loading:any;



  tasksList$: Observable<TaskModel[]>; // servicio comunicacion
  notificationSoCancelled$: Observable<number>;
  notificationError$: Observable<boolean>;

  notificationNewPoSuplier$: Observable<number[]>;
  notificationPoCancelled$: Observable<number[]>
  notificationOffertCancelled$: Observable<number[]>;

 
  subscriptionNotificationSoCancelled: Subscription;
  subscriptionNotificationError: Subscription;
  subscriptiontasksList: Subscription;

  


  constructor(private _taskOdoo: TaskOdooService,
    private subServ:ObtSubSService,
    private ngZone: NgZone,
    public loadingController: LoadingController,
    public navCtrl:NavController,
    private platform: Platform,
    public alertCtrl: AlertController,
   )
    
    {
    
    this._taskOdoo.requestTaskListClient();
    this.presentLoading();
    
  }

  ngOnInit(): void {

    this.observablesSubscriptions();

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
   this.subscriptionNotificationSoCancelled.unsubscribe();
   this.subscriptionNotificationError.unsubscribe();
   this.subscriptiontasksList.unsubscribe();
  }

  observablesSubscriptions() {
    ////////////////////////////////Para el Cliente
      this.notificationSoCancelled$ = this._taskOdoo.getNotificationSoCancelled$();
      this.subscriptionNotificationSoCancelled = this.notificationSoCancelled$.subscribe(notificationSoCancelled => {
        this.ngZone.run(() => {

          let temp = (this.solicitudesList.findIndex(element => element.id === notificationSoCancelled));
          if(temp !== -1){
          this.solicitudesList.splice(temp, 1);
          this.subServ.setSolicitudeList(this.solicitudesList);
          }
        });

      });
    //////////////////Para Todos
    this.notificationError$ = this._taskOdoo.getNotificationError$();
    this.subscriptionNotificationError = this.notificationError$.subscribe(notificationError =>{
      this.ngZone.run(()=>{
        if(notificationError){
        console.log("Error!!!!!!!!!!!");
        }
      });
    });

    this.tasksList$ = this._taskOdoo.getRequestedTaskList$();
    this.subscriptiontasksList=this.tasksList$.subscribe((tasksList: TaskModel[]) => {
      this.ngZone.run(() => {

        console.log("me llego algo");
        let temp: TaskModel[];
        temp = tasksList.filter(task => {
          
            return task.state === 'to invoice'; //Solicitadas
          
        });
        if (typeof this.solicitudesList !== 'undefined' && this.solicitudesList.length > 0) {
          Array.prototype.push.apply(this.solicitudesList, temp);
        } else { this.solicitudesList = temp; }

        this.subServ.setSolicitudeList(this.solicitudesList);

        temp = tasksList.filter(task => {
          return task.state === 'invoiced'; //Contratadas
        });
        if (typeof this.contratadosList !== 'undefined' && this.contratadosList.length > 0) {
          Array.prototype.push.apply(this.contratadosList, temp);
        } else { this.contratadosList = temp;this.historialList = temp; }
        
        console.log(this.contratadosList);
        this.subServ.setContratadosList(this.contratadosList);

        temp = tasksList.filter(task => {
          return task.state === ''; //Historial
        });
        if (typeof this.historialList !== 'undefined' && this.historialList.length > 0) {
          Array.prototype.push.apply(this.historialList, temp);
        } else { this.historialList = temp; }

        this.subServ.setHistorialList(this.historialList);

        console.log(this.solicitudesList,"peticiones a Servidor");
        console.log(this.contratadosList,"peticiones a Servidor contra");
        this.loading.dismiss();
      });
    });
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando Solicitudes...',
      //duration: 2000
    });
    return  this.loading.present();
  }

  setCurrentTab(event) {
    console.log("setCurrentTab");   
    let selectedTab = this.tabs.getSelected();
    console.log("selectedTab", selectedTab);  
    if(selectedTab === 'tab1'){
      this.tab1_active = "_active";
      this.tab2_active = "";
      this.tab3_active = "";
      this.platform.backButton.subscribeWithPriority(10, () => {
        this.presentAlert();
      });
    }
    else if(selectedTab === 'tab2'){
      this.tab1_active = "";
      this.tab2_active = "_active";
      this.tab3_active = "";
      this.platform.backButton.subscribeWithPriority(10, () => {
        this.navCtrl.navigateRoot('/tabs/tab1', {animated: true, animationDirection: 'back' }) ;      
        });
    }
    else if(selectedTab === 'tab3'){
      this.tab1_active = "";
      this.tab2_active = "";
      this.tab3_active = "_active";
      this.platform.backButton.subscribeWithPriority(10, () => {
        this.navCtrl.navigateRoot('/tabs/tab1', {animated: true, animationDirection: 'back' }) ;      
        });
    }
  }


  async presentAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message: 'Desea registrarse con otro usuario',
     
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          handler: (datos) => {
            this.navCtrl.navigateRoot('/login', {animated: true, animationDirection: 'back' }) ;      
    
          }
        }
      ]
    });

    await alert.present();
  } 
 
}

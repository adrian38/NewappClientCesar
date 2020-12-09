import { Component, NgZone, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { TaskModel } from 'src/app/models/task.model';
import { TaskOdooService } from 'src/app/services/task-odoo.service';
import { AuthOdooService } from 'src/app/services/auth-odoo.service';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { LoadingController } from '@ionic/angular';
import { Observable,Subscription,Unsubscribable } from 'rxjs';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  
  
  task: TaskModel;

  solicitudesList: TaskModel[];
  contratadosList: TaskModel[];

  historialList: TaskModel[];
  tasksList$: Observable<TaskModel[]>; // servicio comunicacion

   

  notificationNewPoSuplier: number[];
  notificationNewPoSuplier$: Observable<number[]>;

  notificationSoCancelled$: Observable<number>;

  notificationPoCancelled$: Observable<number[]>;

  

  notificationError$: Observable<boolean>;
  
  notificationOffertCancelled$: Observable<number[]>;

   

  inicio = true;
  loading:any;

  constructor(private _taskOdoo: TaskOdooService,
    private subServ:ObtSubSService,
    private _authOdoo: AuthOdooService,
    private ngZone: NgZone,
    public loadingController: LoadingController) {

    this.observablesSubscriptions();
      
    this._taskOdoo.requestTaskListClient();
    this.presentLoading();
    

  }

  ngOnInit(): void {

 
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

   
  }


  observablesSubscriptions() {

    ////////////////////////////////Para el Cliente

    


    

      this.notificationSoCancelled$ = this._taskOdoo.getNotificationSoCancelled$();
      this.notificationSoCancelled$.subscribe(notificationSoCancelled => {
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
    this.notificationError$.subscribe(notificationError =>{
      this.ngZone.run(()=>{

        if(notificationError){
        console.log("Error!!!!!!!!!!!");
        }
      });

    });


    this.tasksList$ = this._taskOdoo.getRequestedTaskList$();
    this.tasksList$.subscribe((tasksList: TaskModel[]) => {
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
        } else { this.contratadosList = temp; }
        
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
        this.loading.dismiss();
      });

      if (this.inicio){
        this.inicio = false;
        this._taskOdoo.notificationPull();
      }
    });
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'espere...',
      //duration: 2000
    });
   return  this.loading.present();

}
}

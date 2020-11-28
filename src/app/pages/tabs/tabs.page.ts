import { Component, NgZone, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { TaskModel } from 'src/app/models/task.model';
import { TaskOdooService } from 'src/app/services/task-odoo.service';
import { AuthOdooService } from 'src/app/services/auth-odoo.service';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';


import { Observable } from 'rxjs';

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

  notificationNewSoClient$: Observable<boolean>;

  notificationError$: Observable<boolean>;
  
  notificationOffertCancelled$: Observable<number[]>;

   

  inicio = true;

  constructor(private _taskOdoo: TaskOdooService,
    private subServ:ObtSubSService,
    private _authOdoo: AuthOdooService,
    private ngZone: NgZone) {

    this.observablesSubscriptions();
      
    this._taskOdoo.requestTaskListClient();
    


  }

  ngOnInit(): void {

 
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

  }


  observablesSubscriptions() {

    ////////////////////////////////Para el Cliente

    


      this.notificationNewSoClient$ = this._taskOdoo.getNotificationNewSoClient$();
      this.notificationNewSoClient$.subscribe(notificationNewSoClient => {
        this.ngZone.run(() => {

          if (notificationNewSoClient) {
            console.log("Se creo correctamente la tarea");
          }

        });

      });

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
      });
      if (this.inicio){
        this.inicio = false;
        this._taskOdoo.notificationPull();
      }
    });
  }

}

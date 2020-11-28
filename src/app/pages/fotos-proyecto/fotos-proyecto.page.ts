import { Component, NgZone, OnInit } from '@angular/core';
import { AuthOdooService } from 'src/app/services/auth-odoo.service';
import { TaskOdooService } from 'src/app/services/task-odoo.service';
import { Address, TaskModel } from 'src/app/models/task.model';
import { Observable, Subject } from 'rxjs';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fotos-proyecto',
  templateUrl: './fotos-proyecto.page.html',
  styleUrls: ['./fotos-proyecto.page.scss'],
})
export class FotosProyectoPage implements OnInit {

  task:TaskModel;

  notificationError$: Observable<boolean>;
  notificationNewSoClient$: Observable<boolean>;

  constructor(private _taskOdoo: TaskOdooService,private ngZone: NgZone,private router:Router) {
   
    //this.task = this._taskOdoo.getTaskCesar();
   
   }

  ngOnInit() {

    this.notificationNewSoClient$ = this._taskOdoo.getNotificationNewSoClient$();
      this.notificationNewSoClient$.subscribe(notificationNewSoClient => {
        this.ngZone.run(() => {

          if (notificationNewSoClient) {
            console.log("Se creo correctamente la tarea");
            
            this.router.navigate(["/tabs/tab1"]);

          }

        });

      });


      this.notificationError$ = this._taskOdoo.getNotificationError$();
      this.notificationError$.subscribe(notificationError =>{
        this.ngZone.run(()=>{
  
          if(notificationError){
          console.log("Error!!!!!!!!!!!");
          }
        });
  
      });


  }

  fin(){
    this.task = new TaskModel
    this.task.require_materials = true;
    this.task.title= 'Arreglo de llave'
    this.task.product_id = 39;
    this.task.type = ':Servicio de Fontaneria';
    this.task.date = '07:30:30';
    this.task.time = '2020-10-20'
  this._taskOdoo.newTask(this.task);
  }
}

import { Component, OnInit } from '@angular/core';

import { MessageModel } from 'src/app/models/message.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { ChatOdooService } from 'src/app/services/chat-odoo.service';
import { Observable } from 'rxjs';
import { AuthOdooService } from 'src/app/services/auth-odoo.service';
import { TaskModel } from 'src/app/models/task.model';

import { TaskOdooService } from 'src/app/services/task-odoo.service'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {


  purchaseOrderID:number;
  message:MessageModel;
  messagesList:MessageModel[];
  messagesList$: Observable<MessageModel[]>;
  user: UsuarioModel
  usuario$: Observable<UsuarioModel>
  sms:string;

  task:TaskModel;
  task$: Observable<TaskModel>;

  constructor(private _authOdoo:AuthOdooService,
    private _taskOdoo:TaskOdooService,
    private _chatOdoo:ChatOdooService,
    
               ) {
              
   
                this.task = new TaskModel();
                this.task =this._taskOdoo.getTaskCesar();
                this.user = this._authOdoo.getUser();
                this.message = new MessageModel();
                this.messagesList = [];
                
          
                  this.purchaseOrderID = this.task.id;      
           
            
                this._taskOdoo.requestTask(this.purchaseOrderID);  
                
                setInterval(()=>{
                  this._chatOdoo.requestAllMessages(this.purchaseOrderID);
                }, 3000);

  }

  ngOnInit() {
    this.messagesList$ = this._chatOdoo.getAllMessages$();
    this.messagesList$.subscribe(messagesList => {
      this.messagesList = messagesList;
    });

    this.task$ = this._taskOdoo.getRequestedTask$();
    this.task$.subscribe(task =>{
      this.task = task;
    });
  }

  enviarSMS(){

    this.task = new TaskModel();
    this.task =this._taskOdoo.getTaskCesar();

      this.message.offer_id = this.purchaseOrderID;
      this._chatOdoo.sendMessageClient(this.message);  

      //-----------------

    

      this.message= new MessageModel();
      
    
    }

}

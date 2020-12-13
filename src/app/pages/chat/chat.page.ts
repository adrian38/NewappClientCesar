import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MessageModel } from 'src/app/models/message.model';
import { TaskModel } from 'src/app/models/task.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthOdooService } from 'src/app/services/auth-odoo.service';
import { ChatOdooService } from 'src/app/services/chat-odoo.service';
import { TaskOdooService } from 'src/app/services/task-odoo.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  purchaseOrderID: number;

  task: TaskModel;
  task$: Observable<TaskModel[]>;
  message: MessageModel;
  messagesList: MessageModel[];
  messagesList$: Observable<MessageModel[]>;
  user: UsuarioModel
  usuario$: Observable<UsuarioModel>

  constructor(private _authOdoo: AuthOdooService,
    private _taskOdoo: TaskOdooService,
    private _chatOdoo: ChatOdooService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ngZone: NgZone) {


    this.task = new TaskModel();  
    this.task =this._taskOdoo.getTaskCesar();
    this.user = this._authOdoo.getUser();
    this.message = new MessageModel();
    this.messagesList = [];
    this.purchaseOrderID = this.task.id; 

 

    this._taskOdoo.requestTask(this.purchaseOrderID);

   

  }

  ngOnInit(): void {
    this.messagesList$ = this._chatOdoo.getAllMessages$();
    this.messagesList$.subscribe(messagesList => {
      this.ngZone.run(() => {
        console.log(messagesList, "mensajes recibidos");

        let temp = (messagesList.find(element => element.offer_id));
        if (temp) {
          if (this.purchaseOrderID === temp.offer_id) {
            this.messagesList = messagesList;
          }
        }
      });
    });

    this.task$ = this._taskOdoo.getRequestedTask$();
    this.task$.subscribe(task => {
      this.ngZone.run(() => {

       
        let temp = (task.find(element => element.id));
        if (this.purchaseOrderID === temp.id)
          this.task = temp;
      });
    });
  }

 
  enviarSMS() {
    this.message.offer_id = this.purchaseOrderID;
    this._chatOdoo.sendMessageClient(this.message);
    this.message = new MessageModel();
  }

 


}

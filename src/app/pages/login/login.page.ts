import { Component, OnInit,NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthOdooService } from 'src/app/services/auth-odoo.service';
import { ChatOdooService } from 'src/app/services/chat-odoo.service';
import { TaskOdooService } from 'src/app/services/task-odoo.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  connected$: Observable<boolean>;
  usuario:UsuarioModel;
  usuario$:Observable<UsuarioModel>

  user:string;
  pass:string;
  islog:boolean


  constructor(private ngZone: NgZone,
    private _authOdoo:AuthOdooService,
    private _taskOdoo:TaskOdooService,
    private _chatOdoo:ChatOdooService,
    private route:Router) {
this.usuario = new UsuarioModel;
}

               
              

ngOnInit() {

  this.usuario$ = this._authOdoo.getUser$();
  
  this.usuario$.subscribe(user => {
    this.ngZone.run( () => {
      this.usuario = user;
      this.checkUser();
    });
  });

}

checkUser(){
  if(this.usuario.connected){
    this._taskOdoo.setUser(this.usuario);
    this._chatOdoo.setUser(this.usuario);
    console.log('conectado');
            this.route.navigate(["/tabs/tab1"]);    
  }
  else{
    console.log('no se pudo conectar');
  }
}

  iniciar(){
   
   console.log("si");
   console.log("si");
    console.log("user",this.user);
    console.log("pass",this.pass);

    this.usuario.username = this.user;
    this.usuario.password = this.pass;
    this._authOdoo.loginClientApk(this.usuario);
  }
}

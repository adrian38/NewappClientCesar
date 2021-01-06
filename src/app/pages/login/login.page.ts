import { Component, OnInit,NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthOdooService } from 'src/app/services/auth-odoo.service';
import { ChatOdooService } from 'src/app/services/chat-odoo.service';
import { TaskOdooService } from 'src/app/services/task-odoo.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController,Platform } from '@ionic/angular';

//import { NavController } from 'ionic-angular';

import { Location } from '@angular/common';


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

  loading:HTMLIonLoadingElement = null;

  constructor(private ngZone: NgZone,
    private _authOdoo:AuthOdooService,
    private _taskOdoo:TaskOdooService,
    private _chatOdoo:ChatOdooService,
    private route:Router,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public navController:NavController,
    private platform: Platform,
    private _location: Location) {

this.usuario = new UsuarioModel;

this.platform.backButton.subscribeWithPriority(10, () => {
  if (this._location.isCurrentPathEqualTo('/login')) {
    
    this.navController.navigateRoot('/inicio', {animated: true, animationDirection: 'back' }) ;
    
  }
  
  });

}

ngOnInit() {

  this.usuario$ = this._authOdoo.getUser$();
  
  this.usuario$.subscribe(user => {
    this.ngZone.run( () => {
      this.usuario = user;
   /*    sessionStorage.setItem('user', JSON.stringify(user));
      this.usuario = JSON.parse(sessionStorage.getItem('user')); */
      console.log("Dismiss Loading");
      if(this.loading){
        this.loading.dismiss();
      }
      this.checkUser();
    });
  });
}

checkUser(){
  if(this.usuario.connected){
    this._taskOdoo.setUser(this.usuario);
    this._chatOdoo.setUser(this.usuario);
    console.log('conectado');
            //this.route.navigate(["/tabs/tab1"]);   
            
          //this.route.navigateByUrl ('/tabs/tab1', {replaceUrl : true}) ;
    this.navController.navigateRoot('/tabs/tab1', {animated: true, animationDirection: 'forward' }) ;   
  }
  else{
    console.log('no se pudo conectar');
    this.loading.dismiss();
    this.presentAlertConfirm(); 
  }
}

  async iniciar(){
    await this.presentLoading();
    console.log("si");
    console.log("si");
    console.log("user",this.user);
    console.log("pass",this.pass);

    this.usuario.username = this.user;
    this.usuario.password = this.pass;
    this._authOdoo.loginClientApk(this.usuario);
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

async presentAlertConfirm() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Problema de conexión',
    message: 'Intente de nuevo',
    buttons: [
      
     
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
        
          console.log('Confirm Cancel: blah');
        }
      }
    ]
  });

  await alert.present();
}

}
import { Component, OnInit,NgZone } from '@angular/core';
import { Observable, Subscription ,Observer, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthOdooService } from 'src/app/services/auth-odoo.service';
import { ChatOdooService } from 'src/app/services/chat-odoo.service';
import { TaskOdooService } from 'src/app/services/task-odoo.service';
import { AlertController, LoadingController, NavController,Platform } from '@ionic/angular';
import { Location } from '@angular/common';

 


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  
})
export class LoginPage implements OnInit {

  
  usuario:UsuarioModel;
  usuario$:Observable<UsuarioModel>

  user:string;
  pass:string;
  islog:boolean

  loading:HTMLIonLoadingElement = null;

  subscriptionUsuario: Subscription;

  public onlineOffline: boolean = navigator.onLine;
  

  constructor(private ngZone: NgZone,
    private _authOdoo:AuthOdooService,
    private _taskOdoo:TaskOdooService,
    private _chatOdoo:ChatOdooService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public navController:NavController,
    private platform: Platform,
    private _location: Location,
    
   
  ) {

}

ngOnInit() {
  this._taskOdoo.setInitTab(false);
  this.usuario = new UsuarioModel();
  this.subscriptions();
  
}



ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  this.subscriptionUsuario.unsubscribe();
  
}

subscriptions(){

  this.platform.backButton.subscribeWithPriority(10, () => {
    if (this._location.isCurrentPathEqualTo('/login')) {
      
      this.navController.navigateRoot('/inicio', {animated: true, animationDirection: 'back' }) ;
      
    }
    
    });
  

  this.usuario$ = this._authOdoo.getUser$();
  
  this.subscriptionUsuario = this.usuario$.subscribe(user => {
    this.ngZone.run( () => {
      this.usuario = user;
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
    
    if(!this._taskOdoo.getInit()){
    this._taskOdoo.setInit();
    this._taskOdoo.notificationPull();
    }
        
    this.navController.navigateRoot('/tabs/tab1', {animated: true, animationDirection: 'forward' }) ;   
  }
  else{
    
    this.loading.dismiss();
    this.presentAlertConfirm(); 
  }
}

  async iniciar(){
    await this.presentLoading();
    
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
        
        
        }
      }
    ]
  });

  await alert.present();
}

cambiarpass(){
  this.navController.navigateRoot('/contrasolvida', {animated: true, animationDirection: 'forward' }) ;   
 
}

}
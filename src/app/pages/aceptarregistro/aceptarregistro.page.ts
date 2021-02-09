import { Component,NgZone, OnInit } from '@angular/core';
import { NavController,LoadingController, Platform } from '@ionic/angular';
import { Address, UsuarioModel } from 'src/app/models/usuario.model';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { SignUpOdooService } from 'src/app/services/signup-odoo.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-aceptarregistro',
  templateUrl: './aceptarregistro.page.html',
  styleUrls: ['./aceptarregistro.page.scss'],
})
export class AceptarregistroPage implements OnInit {
  
   aceptar:boolean=true;

   usuario:UsuarioModel;
   address:Address;
   islog:boolean

   loading:HTMLIonLoadingElement = null;

   notificationOK$: Observable<boolean>;
   notificationError$: Observable<boolean>;

   subscriptionError: Subscription;
   subscriptionOk: Subscription;


  constructor(public datos:ObtSubSService,
              private _signupOdoo: SignUpOdooService,
              private platform: Platform,
              public navCtrl:NavController,
              public loadingController: LoadingController,
              private ngZone: NgZone) { }

  ngOnInit() {
    console.log("inicio1")
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot('/registro', {animated: true, animationDirection: 'back' }) ;});
      
      this.notificationError$ = this._signupOdoo.getNotificationError$();
      this.subscriptionError = this.notificationError$.subscribe(notificationError =>{
      this.ngZone.run(()=>{

        if(notificationError){
          this.loading.dismiss();
          console.log("Error creando Usuario");
          console.log("inicio2")
          //error por usuario ya creado o conectividad o datos ingreados///////esto lo vamos a definir despues
        }
      });
      });
      this.notificationOK$ = this._signupOdoo.getNotificationOK$();
      this.subscriptionOk = this.notificationOK$.subscribe(notificationOK => {
        this.ngZone.run(() => {

          if (notificationOK) {

            //quitar cargado e ir a la pagina de logguearse
            
            console.log("Usuario Creado");
            this.loading.dismiss();
            this.navCtrl.navigateRoot('/inicio', {animated: true, animationDirection: 'back' }) ;
      
          }

        });

      });
        
      

  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscriptionOk.unsubscribe();
    this.subscriptionError.unsubscribe();
    
  }
  
  condiciones(){
    if(this.aceptar==true)
this.aceptar=false;
else
this.aceptar=true;
  }

  aceptarregistro(){
     this.presentLoading();
    this.usuario = new UsuarioModel;
    this.usuario.address=new Address('','','','','','','','','');
    this.usuario.realname=this.datos.getnombre();
    this.usuario.password=this.datos.getcontraseña();
    this.usuario.phone=this.datos.gettelefono();
    this.usuario.username =this.datos.getcorreo();
    this.usuario.date =this.datos.getfecha();
   /*  this.usuario.date='2020-02-20'; */
    this.usuario.type = 'client';
    
    this.usuario.address.street=this.datos.getcalle(); 
    this.usuario.address.door=this.datos.getpuerta();
    this.usuario.address.stair=this.datos.getescalera();
    this.usuario.address.portal=this.datos.getportal();
    this.usuario.address.cp=this.datos.getcod_postal();
    this.usuario.address.number=this.datos.getnumero();
    this.usuario.address.floor=this.datos.getpiso();

    this.usuario.address.latitude=String(this.datos.getlatitud());
    this.usuario.address.longitude=String(this.datos.getlongitud());
    this.usuario.avatar = this.datos.getfoto0();

    /*  console.log(this.usuario,"nuevo usuario"); */

     console.log("registrono",this.datos.getnombre());
     console.log("contr",this.datos.getcontraseña());
     console.log("tele",this.datos.gettelefono());
     console.log("corr",this.datos.getcorreo());
     console.log("fec",this.datos.getfecha());

     console.log("call",this.datos.getcalle());
     console.log("puer",this.datos.getpuerta());
     console.log("esc",this.datos.getescalera());
     console.log("port",this.datos.getportal());
     console.log("cposta",this.datos.getcod_postal());
     console.log("nume",this.datos.getnumero());
     console.log("pis",this.datos.getpiso());
     


  this._signupOdoo.newUser(this.usuario); 
    
this.limpiar_campos();

console.log("llegue al final")

   /* this.navCtrl.navigateRoot('/inicio', {animated: true, animationDirection: 'back' }) ;
       */  
  }

  limpiar_campos(){
    this.datos.setnombre("");
    /* console.log("registronombre",this.nombre); */
      this.datos.setcorreo("");
     this.datos.setcontraseña("");
      
     this.datos.settelefono("");
     
     this.datos.setcalle("");
     this.datos.setpiso("");
     this.datos.setnumero("");
     this.datos.setpuerta("");
     this.datos.setportal("");
     this.datos.setcod_postal("");
     this.datos.setescalera("");
     this.datos.setfoto0("");
     this.datos.setfoto1("");
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Registrando...',
      //duration: 2000
    });
    console.log("Loading Ok");
    return  this.loading.present();
  }
}

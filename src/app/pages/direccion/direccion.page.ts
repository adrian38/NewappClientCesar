import { Component, OnInit } from '@angular/core';
import { NavController, Platform, AlertController } from '@ionic/angular';
import { Address, TaskModel } from 'src/app/models/task.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { TaskOdooService } from 'src/app/services/task-odoo.service';
import { AuthOdooService } from 'src/app/services/auth-odoo.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Location } from '@angular/common';
@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.page.html',
  styleUrls: ['./direccion.page.scss'],
})
export class DireccionPage implements OnInit {

  calle:string="";
  piso:string="";
  numero:string="";
  puerta:string="";
  portal:string="";
  cod_postal:string="";
  escalera:string="";
  servicio:string="";

  dpcalle:string;
  dppiso:string="";
  dpnumero:string="";
  dppuerta:string="";
  dpportal:string="";
  dpcod_postal:string="";
  dpescalera:string="";
  dpservicio:string="";

  coordenadas:boolean;

  Autofill:boolean=false;
  

  user:UsuarioModel;
  task:TaskModel;

  constructor(private datos:ObtSubSService,
    public navCtrl:NavController,
    private platform: Platform,
    private _authOdoo: AuthOdooService,
    public alertCtrl: AlertController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _location: Location,) { 

      this.coordenadas=this.datos.getcoordenada();
    /*   this.platform.backButton.subscribeWithPriority(10, () => {
        this.navCtrl.navigateRoot('/direccion', {animated: true, animationDirection: 'back' }) ;
          
        }); */

    }

    

  ngOnInit() {
  
      
    console.log("autofillcomo",this.Autofill);

     
  
    this.servicio=this.datos.getServ();
    this.user = this._authOdoo.getUser();
    console.log(this.user); 

this.mantener_campos(1);

//this.initializeApp();

 this.platform.backButton.subscribeWithPriority(10, () => {
  this.navCtrl.navigateRoot('/horarios', {animated: true, animationDirection: 'back' }) ;
    
  }); 
    
/*     this.dplat=String(this.datos.getlatitud());
    this.dplng=String(this.datos.getlongitud()); */
 /*    console.log("1",this.dplat);
    console.log("1",this.dplng); */
   
  }
  cerrarsolicitud(){
  
    this.presentAlert();
  }
  goto(){
   
this.mantener_campos(0);


this.navCtrl.navigateRoot('/comentario', {animated: true, animationDirection: 'forward' }) ;
     
  }

 autofillChange(){
   console.log("si");

if (this.Autofill) {
  for (let value in this.user.address) {
    if (!this.user.address[value])
      this.user.address[value] = '';
  }
  
  console.log(this.user);
  this.calle=this.user.address.street;
  this.puerta=this.user.address.door;
  this.cod_postal=this.user.address.cp;
  this.escalera=this.user.address.stair;
  this.piso=this.user.address.floor;
  this.numero=this.user.address.number;
  this.portal=this.user.address.portal;

  console.log("autofillsi",this.Autofill);
  
}
else{
  console.log("vacio");
  this.calle="";
  this.puerta="";
  this.cod_postal="";
  this.escalera="";
  this.piso="";
  this.numero="";
  this.portal="";
  console.log("autofillno",this.Autofill);
}
}

ubicacion(){
  
this.mantener_campos(0);

  this.navCtrl.navigateRoot('/mapa', {animated: true, animationDirection: 'back' }) ;
      
}


async presentAlert() {
  const alert = await this.alertCtrl.create({
    cssClass: 'my-custom-class',
    header: 'Alerta',
    message: 'Desea cancelar la solicitud',
   
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

this.borrar_campos();

          this.navCtrl.navigateRoot('/tabs/tab1', {animated: true, animationDirection: 'forward' }) ;
    
        }
      }
    ]
  });

  await alert.present();
} 

mantener_campos(i:number){
  if(i==0)
  {
    this.datos.setcalle(this.calle);
    this.datos.setpuerta(this.puerta);
    this.datos.setpiso(this.piso);
    this.datos.setescalera(this.escalera);
    this.datos.setcod_postal(this.cod_postal);
    this.datos.setnumero(this.numero);
    this.datos.setportal(this.portal);
  }
else{

  this.calle=this.datos.getcalle();
  this.puerta=this.datos.getpuerta();
  this.piso=this.datos.getpiso();
  this.escalera=this.datos.getescalera();
  this.cod_postal=this.datos.getcod_postal();
  this.numero=this.datos.getnumero();
  this.portal=this.datos.getportal();
}


}

borrar_campos(){

  this.datos.setTitulo("");

  this.datos.setcalle("");
  this.datos.setpuerta("");
  this.datos.setpiso("");
  this.datos.setescalera("");
  this.datos.setcod_postal("");
  this.datos.setnumero("");
  this.datos.setportal("");

  this.datos.setcomentario("");
  this.datos.setfoto00('../../../assets/fotoadd.png');
  this.datos.setfoto11('../../../assets/fotoadd.png');
  this.datos.setfoto22('../../../assets/fotoadd.png');  

  this.datos.setfoto0('');
  this.datos.setfoto1('');
  this.datos.setfoto2(''); 
}

initializeApp() {
  this.platform.ready().then(() => {
    this.statusBar.styleDefault();
    this.splashScreen.hide();
  });


  this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
    console.log('Back press handler!');
    if (this._location.isCurrentPathEqualTo('/direccion')) {
      this.navCtrl.navigateRoot('/horario', {animated: true, animationDirection: 'back' }) ;
    
      // Show Exit Alert!
      console.log('Show Exit Alert!');
    
      processNextHandler();
    } else {

      // Navigate to back page
      console.log('Navigate to back page');
      this._location.back();

    }

  });

 
}

 }



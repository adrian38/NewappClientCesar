import { Injectable } from '@angular/core';
import { TaskModel } from '../models/task.model';
import { empty, Observable, Subject } from 'rxjs';
import { timeStamp } from 'console';

@Injectable({
  providedIn: 'root'
})
export class ObtSubSService {

  

 
   private estado:boolean;
   private comentario:string="";
  

   notificationSetTabs$ = new Subject<boolean>();
   notificationSetTabs2$ = new Subject<boolean>();
   notificationSetTabs3$ = new Subject<boolean>();
   
   calle:string="";
    numero:string="";
    portal:string="";
    escalera:string="";
    piso:string="";
    puerta:string="";
    codigo_postal:string="";

    SolicitudesList:TaskModel[];
    ContaratadosList:TaskModel[];
    HistorialList:TaskModel[];

    titulo:string="";
    dat:string;
    tim:string;

    longitud:number;
    latitud:number;

   //-----------------------------------------------------------

    nombre:string="";
    i:number=0;
    idString:String;
    private subServicioActual:string;
 
  constructor() { 
    
    this.SolicitudesList = [];
    this.ContaratadosList = [];
    this.HistorialList = [];
  }

  getNotificationSetTab$(): Observable<boolean> {
    return this.notificationSetTabs$.asObservable();
}

getNotificationSetTab2$(): Observable<boolean> {
  return this.notificationSetTabs2$.asObservable();
}

getNotificationSetTab3$(): Observable<boolean> {
  return this.notificationSetTabs3$.asObservable();
}
  
  setSolicitudeList(solicitudesList:TaskModel[]){
    this.SolicitudesList = solicitudesList;
    this.notificationSetTabs$.next(true);
  }

  setContratadosList(contratadosList:TaskModel[]){
    this.ContaratadosList= contratadosList;
    this.notificationSetTabs2$.next(true); 
    
  }

  setHistorialList(historialList:TaskModel[]){
    this.HistorialList= historialList;
    this.notificationSetTabs3$.next(true);

    

  }

  getSolicitudeList(){
    return this.SolicitudesList;
  }

  getContratadosList(){
    return this.ContaratadosList;
  }

  getHistorialList(){
    return this.HistorialList;
  }
  setUtiles(v:boolean){
    this.estado=v;
    
  }

  getUtiles(){
    return this.estado;

  }

  setcomentario(c:string){
    this.comentario = c;
 }

 getcomentario(){
   return this.comentario;
 }

 setcalle(v1:string){
  this.calle=v1;

} 
getcalle(){
  return this.calle;
 }  

 setescalera(v1:string){
  this.escalera=v1;

}  
getescalera(){
  return this.escalera;
}  

setportal(v1:string){
  this.portal=v1;
}  
setpuerta(v1:string){
  this.puerta=v1;
}  
setcod_postal(v1:string){
  this.codigo_postal=v1;
}  
setpiso(v1:string){
  this.piso=v1;
}  
setnumero(v1:string){
  this.numero=v1;
} 

getportal(){
  return this.portal;
}  
getpuerta(){
  return this.puerta;
}  
getcod_postal(){
  return this.codigo_postal;
}  
getpiso(){
  return this.piso;
}  
getnumero(){
 return this.numero;
}  

setServ( valor:string){
  this.subServicioActual=valor;
    }
  
getServ(){
      return this.subServicioActual;
    }

    setTitulo(t:string){
this.titulo=t;
    }
    gettitulo(){
      return this.titulo;
    }

    setCalendarioD(d:string){
      this.dat=d;
      
    }
    setCalendarioT(t:string){
      
      this.tim=t;
    }
    getCalendarioD(){
      return this.dat;

    }

    getCalendarioT(){
      return this.tim;

    }

    setLongitud(lon:number){
      this.longitud=lon;

    }

    getlongitud(){
      return this.longitud;
    }

    
    setLatitud(lat:number){
      this.latitud=lat;

    }

    getlatitud(){
      return this.latitud;
    }
  //-------------------------------------------------------------------------


 setposicion(i:number){
   this.i;
 }

 getposicion(){
   return this.i;
 }

 setidString(id:string){
this.idString=id;
 }

 getidString(){
  return this.idString;
 }

  


 


  
 
setDatoN(v1:string){
  this.nombre=v1;
}  

 





getDatoN(){
  return this.nombre;
}  

}
 


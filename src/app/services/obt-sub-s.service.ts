import { Injectable } from '@angular/core';
import { TaskModel } from '../models/task.model';
import { empty, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObtSubSService {

   i:number=0;
   idString:String;
   private subServicioActual:string;

    private diarioV:boolean;
  private semanalV:boolean;
   private estado:boolean;
   private comentario:string;
   private visible:boolean;

   notificationSetTabs$ = new Subject<boolean>();
   notificationSetTabs2$ = new Subject<boolean>();
   notificationSetTabs3$ = new Subject<boolean>();
   
   
    nombre:string="";
    direccion:string="";
    numero:string="";
    portal:string="";
    escalera:string="";
    piso:string="";
    puerta:string="";
    codigo_postal:string="";

    SolicitudesList:TaskModel[];
    ContaratadosList:TaskModel[];
    HistorialList:TaskModel[];
 
  constructor() { 
    this.visible=true;
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
  setSubServ( valor:string){
this.subServicioActual=valor;
  }

  getSubServ(){
    return this.subServicioActual;
  }

  setUtiles(v:boolean){
    this.estado=v;
    console.log("utiles",this.estado);
  }

  getUtiles(){
    return this.estado;
  }
  
  

  setFrecuenciaS(v:boolean , v2:boolean){

    this.diarioV=v;
    this.semanalV=v2
    console.log("1", this.diarioV);
    console.log("2", this.semanalV);
  }

  setComentario(c:string){
     this.comentario = c;
  }

  getcomentario(){
    return this.comentario;
  }
  
  getFrecuenciaS(){
    console.log( " 3 " , this.diarioV);
      return this.diarioV;
     }

setDatoN(v1:string){
  this.nombre=v1;
}  
setDatoEs(v1:string){
  this.escalera=v1;

}  
setDatoP(v1:string){
  this.portal=v1;
}  
setDatoPu(v1:string){
  this.puerta=v1;
}  
setDatoC(v1:string){
  this.codigo_postal=v1;
}  
setDatoPi(v1:string){
  this.piso=v1;
}  
setDatoNu(v1:string){
  this.numero=v1;
}  
setDatoD(v1:string){
  this.direccion=v1;

} 

setvisible(v:boolean){
  this.visible=v;
}
getVisible(){
  return this.visible;
}
//----------------------------------

getDatoN(){
  return this.nombre;
}  
getDatoEs(){
  return this.escalera;
}  
getDatoP(){
  return this.portal;
}  
getDatoPu(){
  return this.puerta;
}  
getDatoC(){
  return this.codigo_postal;
}  
getDatoPi(){
  return this.piso;
}  
getDatoNu(){
 return this.numero;
}  
getDatoD(){
  return this.direccion;
 }  

}
 


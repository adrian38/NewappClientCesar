import { Component, Input, OnInit } from '@angular/core';
import { TaskModel } from 'src/app/models/task.model';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss'],
})
export class SolicitudComponent implements OnInit {

  @Input() Solicitud: TaskModel ; 

  titulo:string="";
  constructor() { }

  ngOnInit() {
   if( this.Solicitud.title.length < 11){
    this.titulo=this.Solicitud.title;
   }
   else{
    this.titulo=this.Solicitud.title.slice(0,10) + " " + " . . .";
   }
  }

}

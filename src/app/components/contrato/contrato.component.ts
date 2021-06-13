import { Component, Input, OnInit } from '@angular/core';
import { TaskModel } from 'src/app/models/task.model';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.scss'],
})
export class ContratoComponent implements OnInit {

  @Input() contrato: TaskModel = null;
  titulo:string="";
  constructor() { }

  ngOnInit() {

    if( this.contrato.title.length < 11){
      this.titulo=this.contrato.title;
     }
     else{
      this.titulo=this.contrato.title.slice(0,15) + " ... ";
     }
  }

}

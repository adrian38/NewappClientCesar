import { Component,Input, OnInit } from '@angular/core';
import { TaskModel } from 'src/app/models/task.model';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.scss'],
})
export class OfertaComponent implements OnInit {

  @Input() Solicitud: TaskModel = null;
  
  constructor() { }

  ngOnInit() {}

}

import { Component, Input, OnInit } from '@angular/core';
import { TaskModel } from 'src/app/models/task.model';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.scss'],
})
export class ContratoComponent implements OnInit {

  @Input() contrato: TaskModel = null;
  
  constructor() { }

  ngOnInit() {}

}

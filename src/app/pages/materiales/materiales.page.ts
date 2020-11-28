import { Component, OnInit } from '@angular/core';
import { TaskModel } from 'src/app/models/task.model';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { TaskOdooService } from 'src/app/services/task-odoo.service';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.page.html',
  styleUrls: ['./materiales.page.scss'],
})
export class MaterialesPage implements OnInit {
  checkDiariaV:boolean=false;
  checkSemanalV:boolean=false;
  task:TaskModel
  private comentario:string="";
  constructor(private _taskOdoo: TaskOdooService) {
   
    this.task = this._taskOdoo.getTaskCesar();
   
   }

  ngOnInit() {
  
  }

  checkSi(){
    if(this.checkDiariaV)
    {
     
      this.checkDiariaV=false;
     this.task.require_materials=true;
    }
   
    else
    {
      this.checkDiariaV=true;
      
      this.task.require_materials=false;
    }
   
    console.log("si",this.checkDiariaV)
   
  }

  checkNo(){
    if(this.checkSemanalV){
    
      this.checkSemanalV=false;
      this.task.require_materials=true;
    }
    

    else{
      this.checkSemanalV=true;
      this.task.require_materials=false;
 
    }
   
    console.log("no",this.checkSemanalV)
    
   
  }

  clickmateriales(){
this._taskOdoo.setTaskCesar( this.task);
  }

}

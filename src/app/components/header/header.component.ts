import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() clickedClose = new EventEmitter();
  @Input() expandText: string = "Text";
  @Input() titulo: boolean = false;
  @Input() expandHeader: boolean = false;
  @Input() fillBackground: boolean = false;
  @Input() cerrar: boolean = false;
  @Input() atras: boolean = false;
  @Input() headerText: string = "Header";

  ruta:string="";

  constructor(private _location: Location,
              private navCon:NavController,
              private datos:ObtSubSService) {
    
  }

  ngOnInit() {

    this.ruta = this.datos.getruta();
  
  }

  closeEvent(){
    this.clickedClose.emit();
  }
  backEvent(){

    
    if(this._location.isCurrentPathEqualTo('/materiales')){

      if(this.ruta == "option"){
        this.navCon.navigateRoot('/option', {animated: true, animationDirection: 'back' }) ;
      }
      else{
        this.navCon.navigateRoot('/titulo', {animated: true, animationDirection: 'back' }) ;
      }
     
    }
    if(this._location.isCurrentPathEqualTo('/titulo')){
      this.navCon.navigateRoot('/option', {animated: true, animationDirection: 'back' }) ;
    
    }

    if(this._location.isCurrentPathEqualTo('/horarios')){
      this.navCon.navigateRoot('/materiales', {animated: true, animationDirection: 'back' }) ;
    
    }

    
    if(this._location.isCurrentPathEqualTo('/direccion')){
      this.navCon.navigateRoot('/horarios', {animated: true, animationDirection: 'back' }) ;
    
    }

    if(this._location.isCurrentPathEqualTo('/comentario')){
      this.navCon.navigateRoot('/direccion', {animated: true, animationDirection: 'back' }) ;
    
    }

    if(this._location.isCurrentPathEqualTo('/foto')){
      this.navCon.navigateRoot('/comentario', {animated: true, animationDirection: 'back' }) ;
    
    }

    if(this._location.isCurrentPathEqualTo('/resumen')){
      this.navCon.navigateRoot('/foto', {animated: true, animationDirection: 'back' }) ;
    
    }
  }


}

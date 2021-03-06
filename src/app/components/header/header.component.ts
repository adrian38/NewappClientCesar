import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavController } from '@ionic/angular';

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

  constructor(private _location: Location,
              private navCon:NavController) {
    console.log("constructor fillBackground", this.fillBackground);
  }

  ngOnInit() {
    console.log("ngOnInit fillBackground", this.fillBackground);
  }

  closeEvent(){
    this.clickedClose.emit();
  }
  backEvent(){
    if(this._location.isCurrentPathEqualTo('/titulo')){
      this.navCon.navigateRoot('/tarea', {animated: true, animationDirection: 'back' }) ;
    
    }

    if(this._location.isCurrentPathEqualTo('/horarios')){
      this.navCon.navigateRoot('/titulo', {animated: true, animationDirection: 'back' }) ;
    
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

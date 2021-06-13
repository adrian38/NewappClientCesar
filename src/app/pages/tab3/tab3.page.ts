import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { TaskOdooService } from 'src/app/services/task-odoo.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(   public navCtrl:NavController,
    private _taskOdoo: TaskOdooService,
                 private platform: Platform) {
    
    /* this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot('/tabs/tab1', {animated: true, animationDirection: 'back' }) ;      
      }); */
  }

  ngOnInit(): void {
    this._taskOdoo.setTab1In(true);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
    this._taskOdoo.setTab1In(false);
  }

  datospersonales(){
    this.navCtrl.navigateRoot('/datospersonales', {animated: true, animationDirection: 'forward' }) ;      
     
  }

  cambiarcontrasea(){
    this.navCtrl.navigateRoot('/contrase', {animated: true, animationDirection: 'forward' }) ;      
     
  }
  promociones(){
    this.navCtrl.navigateRoot('/promociones', {animated: true, animationDirection: 'forward' }) ;      
  }
  somos(){
    this.navCtrl.navigateRoot('/somos', {animated: true, animationDirection: 'forward' }) ; 
  }

}

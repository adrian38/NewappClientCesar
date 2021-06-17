import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.page.html',
  styleUrls: ['./promociones.page.scss'],
})
export class PromocionesPage implements OnInit {

  promociones: Promociones[] = [
    {
      titulo: 'Promocion 1',
      text: 'De productos de albanileria'
    },
    {
      titulo: 'Promocion 2',
      text: 'De productos de albanileria'
    },
    {
      titulo: 'Promocion 3',
      text: 'De productos de albanileria'
    },
    {
      titulo: 'Promocion 4',
      text: 'De productos de albanileria'
    },
    {
      titulo: 'Promocion 5',
      text: 'De productos de albanileria'
    },
  ]

  constructor( private subServ  : ObtSubSService,
               private navCtrl  : NavController,
               private platform : Platform) { }

  ngOnInit() {

    this.subServ.setruta('promociones');
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot('/tabs/tab3', {animated: true, animationDirection: 'back' }) ;
 });
  }

  onFabClick() {
    console.log('Fab clicked');
  }

  promo(i: number) {
    console.log("Promocion clicked", i);
  }

}

interface Promociones {
  titulo: string,
  text: string
}

import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { Photo } from '../../services/photo.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
 ver:boolean=true;
 foto:Photo
  constructor(public photoService: PhotoService) { }

  ngOnInit() {
  }
/*   addPhotoToGallery() {

    
    this.ver=false;
     this.photoService.addNewToGallery();
  } */

  camara(){
    console.log("camara");
    this.photoService.addNewToCamara();
  }

  
  galeria(){
    console.log("galeria");
    this.photoService.addNewToGallery();
  }
}

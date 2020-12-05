import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { Photo } from '../../services/photo.service';
import {NgxImageCompressService} from 'ngx-image-compress';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

 imgResultBeforeCompress:string;
 imgResultAfterCompress:string;

  constructor(public photoService: PhotoService,
               private imageCompress: NgxImageCompressService) { }

  ngOnInit() {
  }
/*   addPhotoToGallery() {

    
    this.ver=false;
     this.photoService.addNewToGallery();
  } */

  camara(){
    console.log("camara");
    this.photoService.photos=[];
    this.photoService.addNewToCamara();
    this.compressFile();
  
    
  }

  
  galeria(){
    console.log("galeria");
    this.photoService.photos=[];
    this.photoService.addNewToGallery();
  }
  
compressFile() {
  
    this.imageCompress.uploadFile().then(({image, orientation}) => {
    
      this.imgResultBeforeCompress = image;
      console.warn('Size in bytes was:', this.imageCompress.byteCount(image));
      
      this.imageCompress.compressFile(image, orientation, 50, 50).then(
        result => {
          this.imgResultAfterCompress = result;
          console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
        }
      );
      
    });
    
  }
}

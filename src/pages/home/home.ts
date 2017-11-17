import { SimpleAlert } from '../../helper/simple-alert';
import { PhotoModel } from '../../model/photo-model';
import { Component } from '@angular/core';
import { NavController, Platform, IonicPage } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loaded: boolean = false;
  photoTaken: boolean = false;
  photos: PhotoModel[] = [];

  constructor(public navCtrl: NavController, private platform: Platform, private camera: Camera, private alert: SimpleAlert, private file: File) {

      this.loadPhotos();
      document.addEventListener('resume', ()=>{
        if(this.photos.length > 0){
          let today = new Date();
          if(this.photos[0].date.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
            this.photoTaken = true;
          } else {
            this.photoTaken = false;
          }
        }
      }, false);
  }
  takePhoto(): any {
    if(!this.loaded || this.photoTaken) {
      return false;
    }
    if(!this.platform.is('cordova')) {
      console.log("You can only take photos on a devices");
      return false;
    }

    let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI, // return the path of the image on the device
      sourceType: this.camera.PictureSourceType.CAMERA, // use the camemra to grab the image
      encodingType: this.camera.EncodingType.JPEG, // return the image in jpeg format
      cameraDirection: this.camera.Direction.FRONT, // front facing camera
      saveToPhotoAlbum: true // save a copy to the users photo album as well 
    }
    this.camera.getPicture(options).then((imagePath) => {
      console.log(imagePath);
      let currentName = imagePath.replace(/^.*[\\\/]/, '');

      let d = new Date(),
        n = d.getTime(),
        newFileName = n + '.jpg';
      if(this.platform.is('android')){
        File
      }
    }, (err) => {
      let promt = this.alert.create('Oops!', 'Something went wrong.');
      promt.present();
    });

  }
  loadPhotos() {

  }
}

import { DataProvider } from '../../providers/data/data';
import { SimpleAlert } from '../../helper/simple-alert';
import { PhotoModel } from '../../model/photo-model';
import { Component } from '@angular/core';
import { NavController, Platform, IonicPage, ModalController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, 
    private modalCtrl: ModalController,
    private platform: Platform, 
    private camera: Camera, 
    private alert: SimpleAlert, 
    private file: File, 
    private dataService: DataProvider) {

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
      destinationType: this.camera.DestinationType.NATIVE_URI, // return the path of the image on the device
      sourceType: this.camera.PictureSourceType.CAMERA, // use the camemra to grab the image
      encodingType: this.camera.EncodingType.JPEG, // return the image in jpeg format
      cameraDirection: this.camera.Direction.FRONT, // front facing camera
      saveToPhotoAlbum: true // save a copy to the users photo album as well 
    }
    this.camera.getPicture(options).then((imagePath) => {
      console.log(imagePath);
      let currentName = imagePath.match(/(^.*[\\\/])(.*$)/)[2];
      let currentPath = imagePath.match(/(^.*[\\\/])(.*$)/)[1];

      let d = new Date(),
        n = d.getTime(),
        newFileName = n + '.jpg';
      if(this.platform.is('android')){
        this.file.moveFile(currentPath, currentName, this.file.dataDirectory, newFileName).then((success) => {
          this.photoTaken = true;
          this.createPhoto(success.nativeURL);
        }, (error) => {
          let promt = this.alert.create('Oops1', 'Something went wrong.'+error);
          promt.present();
        })
      }
    }, (err) => {
      let promt = this.alert.create('Oops!', 'Something went wrong.'+err);
      promt.present();
    });

  }
  createPhoto(photo) {
    let newPhoto = new PhotoModel(photo, new Date());
    this.photos.unshift(newPhoto);
    this.save();
  }
  sharePhoto(url) {

  }
  save() {
    this.dataService.save(this.photos);
  }
  loadPhotos() {
    this.dataService.getData().then((photos) => {

      let savedPhoto: any = false;
      if(typeof(photos) != 'undefined'){
        savedPhoto = JSON.parse(photos);
      }
      if(savedPhoto){
        savedPhoto.forEach((photo) => {
          this.photos.push(new PhotoModel(photo.image, 
            new Date(photo.date)));
        });
      }
      if(this.photos.length > 0) {
        let today = new Date();
        if(this.photos[0].date.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)){
          this.photoTaken = true;
        }
      }
      this.loaded = true;
    });
  }
  removePhoto(photo){
    let today = new Date();
    if(photo.date.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)){
      this.photoTaken = false;
    }
    
    let index = this.photos.indexOf(photo);
    if(index > -1){
      this.photos.splice(index, 1);
      this.save();
    }
  }

  playSlideShow(){
    if(this.photos.length > 1) {
      let modal = this.modalCtrl.create('SlideshowPage', { photos : this.photos});
      modal.present();
    } else {
      let promt = this.alert.create('Oops!', 'You need at least two photos before you can play a slideshow');
      promt.present();
    }
    
  }
}

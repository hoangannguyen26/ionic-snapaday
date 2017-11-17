import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-slideshow',
  templateUrl: 'slideshow.html',
})
export class SlideshowPage {

  @ViewChild('imagePlayer') imagePlayer: ElementRef;

  imagePlayerInterval: any;
  photos: any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
    this.photos = navParams.get('photos');
  }

  closeModal(){
    this.view.dismiss();
  }
  ionViewDidLoad() {
    this.playPhotos();
  }
  
  playPhotos() {
    let imagePlayer = this.imagePlayer.nativeElement;
    let i = 0;

    clearInterval(this.imagePlayerInterval);

    // reset
    this.imagePlayerInterval = setInterval(() => {
      if(i < this.photos.length){
        imagePlayer.src = this.photos[i].image;
        i ++;
      } else {
        clearInterval(this.imagePlayerInterval);
      }
    }, 500);

  }
}

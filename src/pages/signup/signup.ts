import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import {  } from '@angular/forms/src/form_builder';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm: FormGroup;
  public loading: Loading;
  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    formBuilder: FormBuilder, 
    private authService: AuthProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
    this.signupForm = formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, EmailValidator.isValid])
      ],
      password: [
        '',
        Validators.compose([Validators.maxLength(6),Validators.required])
      ]
    });
  }

  signup(): void{
    if(!this.signupForm.valid) {
      console.log('You need to fill all information');
    } else {
      const email = this.signupForm.value.email;
      const password = this.signupForm.value.password;

      this.authService.signupUser(email, password).then(
        (user) => {
          this.loading.dismiss().then(() => {
            this.navCtrl.setRoot('HomePage');
          })
      }).catch((err) => {
        this.loading.dismiss().then(() => {
          let alert = this.alertCtrl.create({
            message: err.message,
            buttons:[{ text: 'Ok', role: 'Ok' }]
          });
          alert.present();
        })
      });
      this.loading = this.loadingCtrl.create();
      this.loading.present();


    }
  }
}

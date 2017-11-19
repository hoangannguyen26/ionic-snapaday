import { Component } from '@angular/core';
import { 
  AlertController,
  LoadingController,
  IonicPage, NavController, NavParams, Loading,

} from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  loading: Loading;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    formBuilder: FormBuilder,
    private authService: AuthProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {
    this.loginForm = formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, EmailValidator.isValid])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    })
  }
  goToSignup(){
    this.navCtrl.push('SignupPage');
  }
  goToResetPassword() {

  }
  login(): void {

    if(!this.loginForm.valid) {
      console.log(
        `Form is not vaild yet, current value: ${this.loginForm.valid}`
      )
    } else {

      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.authService.loginUser(email, password).then((authData) => {
        this.loading.dismiss().then(() => {
          this.navCtrl.setRoot('HomePage');
        });
      }, (err) => { 
        this.loading.dismiss().then(() => {
          const alert = this.alertCtrl.create({
            message: err.message,
            buttons: [{ text: 'Ok', role: 'cancel'}]
          });
          alert.present();
        })
      });
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }
}

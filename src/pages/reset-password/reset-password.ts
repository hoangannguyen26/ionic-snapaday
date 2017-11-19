import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  AlertController} from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the ResetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

  resetPasswordForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private authService: AuthProvider,
    formBuilder: FormBuilder
  ) {
    this.resetPasswordForm = formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, EmailValidator.isValid])
      ]
    });
  }

  resetPassword(email) {
    if(!this.resetPasswordForm.valid) {
      console.log(
        `Form is not vaild yet, current value: ${this.resetPasswordForm.value}`
      );
    } else {

      const email: string = this.resetPasswordForm.value.email;

      this.authService.resetPassword(email).then(
        user => {
          const alert = this.alertCtrl.create({
            message: 'Check your email for a password reset link',
            buttons: [
              {
                text: 'Ok',
                role: 'cancel',
                handler: () => {
                  this.navCtrl.pop();
                }
              }
            ]
          });
          alert.present();
        },
        error => {
          const alertError = this.alertCtrl.create({
            message: error.message,
            buttons: [{ text: 'Ok', role: 'cancel'}]
          });
          alertError.present();
        }
      );

    }

  }

}

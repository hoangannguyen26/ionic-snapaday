import { AlertController, Alert } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class SimpleAlert {

    constructor( private alertCtrl: AlertController ){

    }

    create(title: string, message: string ): Alert {
        return this.alertCtrl.create({
            title: title,
            message: message,
            buttons: ['Ok']
        })
    }

}
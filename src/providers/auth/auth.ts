import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@Injectable()
export class AuthProvider {

  constructor(private fb: Facebook) {
  }

  signupUser(email: string, password: string): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((newUser) => {
        firebase
        .database()
        .ref(`/userProfile/${newUser.uid}/email`)
        .set(email)
        .then(()=> {
        }).catch ((err) => {
          console.log(err);
          throw new Error(err);
        })
      }).catch((err) => {
        console.log(err);
        throw new Error(err);
      });
  }

  loginUser(email:string, password: string) {

    return firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then(()=> {
    
    }).catch((err) => {
      console.log(err);
      throw new Error(err);
    })

  }

  resetPassword(email):Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void>{
    const userId = firebase.auth().currentUser.uid;
    firebase.database()
    .ref(`/userProfile/${userId}`)
    .off();
    return firebase.auth().signOut();
  }

  loginFaceBook(): Promise<any> {
    return this.fb.login(['email'])
    .then((res: FacebookLoginResponse)=>{
      const fbCredential = firebase.auth.FacebookAuthProvider
        .credential(res.authResponse.accessToken);

      firebase.auth().signInWithCredential(fbCredential)
      .then((success) => {
        console.log("Login success");
      })
      .catch((error) => {
        console.log("Login fail: "+JSON.stringify(error));
        throw new Error(error);
      })
      
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error);
    })
  }
    
}

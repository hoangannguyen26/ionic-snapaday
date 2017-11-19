import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class AuthProvider {

  constructor() {
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
    
}

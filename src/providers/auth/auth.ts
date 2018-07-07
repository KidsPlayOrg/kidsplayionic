import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


@Injectable()
export class AuthProvider {

  constructor() {
  }

  login(email:string, password:string): Promise<any>{
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  register(email:string, password:string): Promise<any>{
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(newUser =>{
        firebase.database()
        .ref(`/userProfile/${newUser.user.uid}/email`)
        .set(email);
      }).catch( error => {
        console.error(error);
        throw new Error(error);
      });
  }

  resetPassword(email:string): Promise<void>{
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logout(): Promise<void>{
    const userId: string = firebase.auth().currentUser.uid;
    firebase.database().ref(`/userProfile/${userId}`).off();
    return firebase.auth().signOut();
  }

}
 
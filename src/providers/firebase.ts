import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class FirebaseProvider {

  constructor(public afd: AngularFireDatabase) {  }

  public getUsers() {
    return this.afd.list('/users/');
  }

  public addUsers(user) {
    this.afd.list('/users/').push(user);
  }

  public removeUser(user) {
    this.afd.list('/users/').remove(user);
  }
}

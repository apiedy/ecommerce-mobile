import { Injectable } from '@angular/core';
import { AngularFireOfflineDatabase } from 'angularfire2-offline/database';

@Injectable()
export class FirebaseProvider {

  constructor(public afd: AngularFireOfflineDatabase) {  }

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

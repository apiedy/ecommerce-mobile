import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'

@Injectable()
export class UserProvider {
    usersRef: FirebaseListObservable<any>;

    constructor(private db: AngularFireDatabase) {
        console.log(db.list('users'));
        this.usersRef = this.db.list('users');
    }
    
    public login() {
        this.usersRef.subscribe(users => console.log(users));
    }
}
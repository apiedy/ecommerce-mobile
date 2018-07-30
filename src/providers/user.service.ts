import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class UserProvider {
    users$: FirebaseListObservable<any>;
    currentUser: Object;

    constructor(private db: AngularFireDatabase) {
        this.users$ = this.db.list('users');
    }
    
    public login(username, password) {
        return this.users$.map((users => {
            return users.filter(user => user.username === username && user.password === password)
        }));
    }

    public setCurrentUser(user) {
        this.currentUser = user;
    }

    public getCurrentUser() {
        return this.currentUser;
    }
}

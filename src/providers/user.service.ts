import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { AngularFireOfflineDatabase, AfoListObservable } from 'angularfire2-offline/database';

@Injectable()
export class UserProvider {
    users$: AfoListObservable<any>;
    currentUser: Object;

    constructor(private db: AngularFireOfflineDatabase, public evts: Events) {
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

    public logout() {
        this.currentUser = {};
        this.evts.publish('user:logout');
    }
}

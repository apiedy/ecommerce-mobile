import { Pipe, PipeTransform } from '@angular/core';

import { UserProvider } from '../providers/user.service';
import { CONST } from '../shared/constants';

@Pipe({ name: 'userProductFilter' })
export class UserProductFilter implements PipeTransform {
    constructor(public userService: UserProvider) { }

    transform(value, page = '') {
        if (value !== null) {
            const currUsername = this.userService.getCurrentUser()['username'];

            switch(page) {
                case CONST.inventory: return value.filter(product => product.owner === currUsername);
                
                case CONST.manage: return value.filter(product => product.seller === currUsername);

                case CONST.marketplace: return value.filter(product => product.seller !== currUsername);

                default: return value;
            }
        }
    }
}

import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ProductService {
    constructor(private db: AngularFireDatabase) { 
    }

    public getProducts() {
        return this.db.list('/products/')
    }

    public addProduct(product) {
        this.db.list('/products/').push(product);
    }

    public removeProduct(product) {
        this.db.list('/products/').remove(product);
    }

    public updateProduct(product, key) {
        this.db.object('/products/'+ key).update(product);
    }
}

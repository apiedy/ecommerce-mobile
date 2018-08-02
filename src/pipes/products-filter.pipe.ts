import { Pipe, PipeTransform } from '@angular/core';
import { CONST } from '../shared/constants';

@Pipe({ name: 'prodFilter' })
export class ProductsFilter implements PipeTransform {
    transform(value: any[], filter: string) {
        if(value !== null && value !== undefined) {

            if (filter === CONST.buy.toLowerCase())
                return value.filter(product => product.price !== undefined)
            else if (filter === CONST.trade.toLowerCase())
                return value.filter(product => product.tradeFor !== undefined)
        }
    }
}

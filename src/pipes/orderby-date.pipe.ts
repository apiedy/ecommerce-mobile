import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'orderByDate' })
export class OrderByDatePipe implements PipeTransform {
    transform(value, order, dateElement) {
        if(value !== null && value !== undefined) {
            if(order === 'desc')
                return value.sort((a, b) => Date.parse(b[dateElement]) - Date.parse(a[dateElement]));
            else if(order === 'asc')
                return value.sort((a, b) => Date.parse(a[dateElement]) - Date.parse(b[dateElement]));
        }
    }
}
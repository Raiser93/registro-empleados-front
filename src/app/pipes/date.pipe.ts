import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'date'
})
export class DatePipe implements PipeTransform {

    transform(value: string | number | Date, time = false): string {
        let format = 'dd/MM/YYYY';
        if (time) {
            format += ' HH:mm:ss'
        }
        const date = formatDate(new Date(value), format, 'en');
        return date;
    }

}

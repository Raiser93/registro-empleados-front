import { Pipe, PipeTransform } from '@angular/core';
import { SuppliesUtils } from '../utils/supplies.utils';

@Pipe({
    name: 'countryEmployee'
})
export class CountryEmployeePipe implements PipeTransform {

    transform(value: number): string {

        if (value > 0) {
            return SuppliesUtils.COUNTRIES[value - 1];
        }

        return '';
    }

}

import { Pipe, PipeTransform } from '@angular/core';
import { SuppliesUtils } from '../utils/supplies.utils';

@Pipe({
    name: 'areaEmployee'
})
export class AreaEmployeePipe implements PipeTransform {

    transform(value: number): string {

        if (value > 0) {
            return SuppliesUtils.AREAS_EMPLOYEES[value - 1];
        }

        return '';
    }

}

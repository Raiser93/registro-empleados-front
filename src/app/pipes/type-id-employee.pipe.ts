import { Pipe, PipeTransform } from '@angular/core';
import { SuppliesUtils } from '../utils/supplies.utils';

@Pipe({
    name: 'typeIdEmployee'
})
export class TypeIdEmployeePipe implements PipeTransform {

    transform(value: number): string {

        if (value > 0) {
            return SuppliesUtils.TYPE_ID_EMPLOYEES[value - 1];
        }

        return '';
    }

}

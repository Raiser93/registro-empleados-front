import { Pipe, PipeTransform } from '@angular/core';
import { SuppliesUtils } from '../utils/supplies.utils';

@Pipe({
    name: 'stateEmployee'
})
export class StateEmployeePipe implements PipeTransform {

    transform(value: number): string {

        if (value > 0) {
            return SuppliesUtils.STATES_EMPLOYEES[value - 1];
        }

        return '';
    }

}

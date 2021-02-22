import { Component, OnInit } from '@angular/core';
import { FilterSearchModel } from 'src/app/models/filter.model';
import { EmployeeService } from 'src/app/services/services.index';
import { SuppliesUtils } from 'src/app/utils/supplies.utils';
import { SwalUtils } from 'src/app/utils/swal.utils';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
    getEmployees: any;
    fromPage = 0;

    states: string[] = [];
    countries: string[] = [];
    idTypes: string[] = [];

    filterSearchEmployee: FilterSearchModel = {
        input: '',
        idType: '',
        country: '',
        state: ''
    }

    constructor(
        public employeeService: EmployeeService
    ) {}

    ngOnInit(): void {
        this.states = SuppliesUtils.STATES_EMPLOYEES;
        this.countries = SuppliesUtils.COUNTRIES;
        this.idTypes = SuppliesUtils.TYPE_ID_EMPLOYEES;

        this.getEmployees = this.employeeService.loadEmployees(this.fromPage, this.filterSearchEmployee);
    }

    changeFrom(value: number) {
        const from = this.fromPage + value;
        if (from >= this.employeeService.totalRows) {
            return;
        }

        if (from < 0) {
            return;
        }

        this.fromPage = from;
        this.getEmployees = this.employeeService.loadEmployees(this.fromPage, this.filterSearchEmployee);
    }


    applyFilter() {
        this.fromPage = 0;
        this.getEmployees = this.employeeService.loadEmployees(this.fromPage, this.filterSearchEmployee);
    }

    async deleteEmployee(employee) {
        try {
            const confirm = await SwalUtils.confirmSwal({
                title: 'Está seguro de que desea eliminar el empleado?',
                confirmButtonText: 'Sí',
                cancelButtonText: 'No'
            });
            
            if (confirm.value) {
                this.employeeService.deleteEmployee(employee).subscribe(resp => {
                    SwalUtils.swalToast({
                        message: 'Se ha eliminado el empleado correctamente',
                        icon: 'success'
                    });
                    this.fromPage = 0;
                    this.getEmployees = this.employeeService.loadEmployees(this.fromPage, this.filterSearchEmployee);
                });
            }
        } catch (error) {
            SwalUtils.userExeption({
                title: 'Error',
                message: 'Ocurrio un error al tratar de eliminar el empleado',
                icon: 'error',
                error,
                origin: `${EmployeesComponent.name} -> ${this.deleteEmployee.name}`
            });
        }
    }

}

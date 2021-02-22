import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICES } from 'src/app/config/config';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { SwalUtils } from 'src/app/utils/swal.utils';
import { FilterSearchModel } from 'src/app/models/filter.model';
import { EmployeesComponent } from 'src/app/pages/employees/employees.component';
import { EmployeeModel } from 'src/app/models/employee.model';

@Injectable()
export class EmployeeService {

    viewTotal: number;
    currentPage: number;
    totalRows: number;

    constructor(
        private http: HttpClient
    ) {}

    createEmployee(employee: EmployeeModel) {
        let url = URL_SERVICES;
        url += 'employee/create-employee';
        return this.http.post(url, employee).pipe(
            map((resp: {
                ok: boolean;
                employee: EmployeeModel;
            }) => {
                return resp.employee;
            }),
            catchError(error => {
                console.error(error);
                return throwError(error.error.message || '');
            })
        )
    }

    loadEmployees(from = 0, filter?: FilterSearchModel) {
        let url = URL_SERVICES;
        url += 'employee/list-employees';
        url += `?from=${from}`;
        if (filter) {
            url += `&general=${filter.input}&idType=${filter.idType}&country=${filter.country}&state=${filter.state}`
        }

        return this.http.get(url).pipe(
            map((resp: {
                ok: boolean;
                employees?: EmployeeModel[];
                total?: number;
            }) => {
                this.currentPage = (from / 10) + 1;
                this.viewTotal = Math.ceil((resp.total || 0) / 10);
                this.totalRows = resp.total;
                return resp.employees
            }),
            catchError(error => {
                console.log(error);
                SwalUtils.swalToast({
                    message: 'Ocurrio un error al tratar de obtener la lista de empleados',
                    icon: 'error'
                });
                return throwError(error);
            })
        )
    }

    deleteEmployee(employee: EmployeeModel) {
        let url = URL_SERVICES;
        url += 'employee/delete-employee/'
        url += `${employee.idType}/${employee.idNumber}`;
        return this.http.delete(url).pipe(
            map((resp: {
                ok: boolean,
                employee: EmployeeModel
            }) => {
                return resp.employee;
            }),
            catchError(error => throwError(error))
        );
    }

    loadOneEmployee({idType, idNumber}) {
        let url = URL_SERVICES;
        url += 'employee/one-employee/';
        url += `${idType}/${idNumber}`;

        return this.http.get(url).pipe(
            map((resp: {
                ok: boolean,
                employee: EmployeeModel
            }) => {
                return resp.employee
            }),
            catchError(error => throwError(error))
        )
    }

    valdiateEmail(email, {idType, idNumber}) {
        let url = URL_SERVICES;
        url += 'employee/check-email/';
        url += `${email}/${idType}/${idNumber}`;

        return this.http.get(url).pipe(
            map((resp: {
                ok: boolean,
                exist: boolean
            }) => {
                return resp.exist
            }),
            catchError(error => throwError(error))
        )
    }

    editEmployee({idType, idNumber}, employee: EmployeeModel) {
        let url = URL_SERVICES;
        url += 'employee/edit-employee/';
        url += `${idType}/${idNumber}`;

        return this.http.put(url, employee).pipe(
            map((resp: {
                ok: boolean,
                employee: EmployeeModel
            }) => {
                return resp.employee
            }),
            catchError(error => throwError(error))
        )
    }
}

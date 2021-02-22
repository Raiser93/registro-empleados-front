import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {  NgbCalendar, NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DOMAIN } from 'src/app/config/config';
import { EmployeeModel } from 'src/app/models/employee.model';

import { EmployeeService } from 'src/app/services/services.index';
import { SwalUtils } from 'src/app/utils/swal.utils';

@Component({
    selector: 'app-register-employee',
    templateUrl: './register-employee.component.html',
    styleUrls: ['./register-employee.component.scss']
})
export class RegisterEmployeeComponent implements OnInit {

    formEmployee: FormGroup;
    minDate: NgbDateStruct;
    maxDate: NgbDateStruct;

    editEmployee = false;
    countEmail = 0;
    ids: {idType: number, idNumber: string} = {
        idType: 0,
        idNumber: '-'
    };

    constructor(
        private ngbCalendar: NgbCalendar,
        private dateAdapter: NgbDateAdapter<string>,
        public employeeService: EmployeeService,
        public route: ActivatedRoute,
        private router: Router
    ) {
        this.route.params.subscribe(({idType, idNumber}) => {
            if (idType && idNumber) {
                this.employeeService.loadOneEmployee({idType, idNumber}).subscribe(employee => {
                    console.log(employee);
                    this.ids = JSON.parse(JSON.stringify({idType, idNumber}))
                    this.initFormEmployee(employee);
                }, error => {
                    this.router.navigateByUrl('/');
                })
            }
        })
    }

    ngOnInit(): void {
        const t = this.ngbCalendar.getToday();
        let today = this.dateAdapter.toModel(t);
        const date = new Date();
        date.setMonth(date.getMonth() - 1);

        this.minDate = {day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear()};
        this.maxDate = t;

        this.initFormEmployee();
    }

    initFormEmployee(employee?: EmployeeModel) {
        this.formEmployee = new FormGroup({
            name: new FormControl(null, [Validators.required, Validators.maxLength(20), Validators.pattern(/^[A-Z]+$/)]),
            otherName: new FormControl(null, [Validators.maxLength(50), Validators.pattern(/^[A-Z]+$/)]),
            surname: new FormControl(null, [Validators.required, Validators.maxLength(20), Validators.pattern(/^[A-Z ]+$/)]),
            secondSurname: new FormControl(null, [Validators.required, Validators.maxLength(20), Validators.pattern(/^[A-Z]+$/)]),
            idType: new FormControl('', [Validators.required]),
            idNumber: new FormControl(null, [Validators.required, Validators.maxLength(20), Validators.pattern(/^[A-Z 0-9 -]+$/i)]),
            countryEmployment: new FormControl('', [Validators.required]),
            email: new FormControl(null, [Validators.required]),
            dateAdmission: new FormControl(null, [Validators.required]),
            area: new FormControl('', [Validators.required]),
            state: new FormControl({value: '1', disabled: true}, [Validators.required]),
            registrationDate: new FormControl({
                value: formatDate(new Date(), 'dd/MM/YYYY HH:mm:ss', 'en'),
                disabled: true
            }, [Validators.required]),
        });
        if (employee) {
            this.editEmployee = true;
            const dateAdmission = new Date((employee.dateAdmission as string));
            const registrationDate = new Date(employee.updatedAt);
            const mRegistrationDate = new Date(employee.createdAt);
            mRegistrationDate.setMonth(mRegistrationDate.getMonth() - 1);
            employee.registrationDate = formatDate(registrationDate, 'dd/MM/YYYY HH:mm:ss', 'en');

            this.minDate = {
                day: mRegistrationDate.getDate(),
                month: mRegistrationDate.getMonth() + 1,
                year: mRegistrationDate.getFullYear()
            };
            this.maxDate = {
                day: registrationDate.getDate(),
                month: registrationDate.getMonth() + 1,
                year: registrationDate.getFullYear()
            };;

            employee.dateAdmission = this.dateAdapter.toModel({
                day: dateAdmission.getDate(),
                month: dateAdmission.getMonth() + 1,
                year: dateAdmission.getFullYear()
            });
            this.formEmployee.setValue({
                name: employee.name,
                otherName: employee.otherName,
                surname: employee.surname,
                secondSurname: employee.secondSurname,
                idType: employee.idType,
                idNumber: employee.idNumber,
                countryEmployment: employee.countryEmployment,
                email: employee.email,
                dateAdmission: employee.dateAdmission,
                area: employee.area,
                state: employee.state,
                registrationDate: employee.registrationDate,
            });
        }
    }

    uppercaseInputSelected(input, field: string, space = false): void {
        let text: string = input.value;
        if (!space) {
            text = text.trim().split(' ').join('');
        }
        this.formEmployee.controls[field].patchValue(text.toUpperCase());
    }

    async generateEmail(input, field: string): Promise<void> {
        try {
            
            if (field === 'surname') {
                const surname = this.formEmployee.value.surname || '';
                this.formEmployee.controls.surname.patchValue(surname.trim());
            }
    
            if (field === 'name' || field === 'surname' || field === 'countryEmployment') {
                if (this.formEmployee.value.name && this.formEmployee.value.surname && this.formEmployee.value.countryEmployment) {
                    const name = this.formEmployee.value.name.toLowerCase();
                    let surname = this.formEmployee.value.surname.toLowerCase();
                    surname = surname.split(' ').join('');
                    let email = `${name}.${surname}@${DOMAIN[this.formEmployee.value.countryEmployment]}`;
    
                    SwalUtils.waitingMessage({
                        message: 'Valindando correo'
                    });
                    while (true) {
                        const exist = await this.valdiateEmail({
                            email,
                            id: this.formEmployee.value.id
                        });
                        if (exist) {
                            this.countEmail++;
                            email = `${name}.${surname}.${this.countEmail}@${DOMAIN[this.formEmployee.value.countryEmployment]}`;
                        } else {
                            this.countEmail = 0;
                            break;
                        }
                    }
                    SwalUtils.forceClosingSwal();
                    this.formEmployee.controls.email.patchValue(email);
                }
            }
        } catch (error) {
            SwalUtils.userExeption({
                title: 'Error',
                message: 'Ocurrio un error al generar un correo',
                icon: 'error',
                error,
                origin: `${RegisterEmployeeComponent.name} -> ${this.generateEmail.name}`
            })
            this.formEmployee.controls.email.patchValue('');
        }
    }

    async valdiateEmail({email, id}) {
        return new Promise((resolve, reject) => {
            this.employeeService.valdiateEmail(email, this.ids).subscribe(resp => {
                console.log(resp);
                resolve(resp);
            }, error => {
                reject(error);
            });
        });
    }

    saveChange(): void {
        if (this.formEmployee.invalid) {
            return;
        }

        const employee = this.formEmployee.getRawValue();
        const dateSplit = employee.dateAdmission.split('-');
        employee.dateAdmission = `${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]}`;

        if (this.editEmployee) {
            this.employeeService.editEmployee(this.ids, employee).subscribe(resp => {
                console.log(resp);
                this.formEmployee.controls.registrationDate.patchValue(formatDate(new Date(), 'dd/MM/YYYY HH:mm:ss', 'en'));
                SwalUtils.swalToast({
                    message: 'Se ha guardado los cambios',
                    icon: 'success'
                });
            }, error => {
                console.error(error);
                SwalUtils.swalToast({
                    message: error,
                    icon: 'error',
                })
            });
        } else {
            this.employeeService.createEmployee(employee).subscribe(resp => {
                SwalUtils.swalEmployeeCreated(`${employee.name} ${employee.otherName} ${employee.surname} ${employee.secondSurname}`);
                this.initFormEmployee();
                console.log(resp);
            }, error => {
                SwalUtils.swalToast({
                    message: error,
                    icon: 'error',
                })
            });
        }
    }

}

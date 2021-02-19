import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DOMAIN } from 'src/app/config/config';

@Component({
    selector: 'app-register-employee',
    templateUrl: './register-employee.component.html',
    styleUrls: ['./register-employee.component.scss']
})
export class RegisterEmployeeComponent implements OnInit {

    formEmployee: FormGroup;

    constructor() {}

    ngOnInit(): void {

        this.formEmployee = new FormGroup({
            name: new FormControl(null, [Validators.required, Validators.maxLength(20), Validators.pattern(/^[A-Z]+$/)]),
            otherName: new FormControl(null, [Validators.maxLength(50), Validators.pattern(/^[A-Z]+$/)]),
            surname: new FormControl(null, [Validators.required, Validators.maxLength(20), Validators.pattern(/^[A-Z ]+$/)]),
            secondSurname: new FormControl(null, [Validators.required, Validators.maxLength(20), Validators.pattern(/^[A-Z]+$/)]),
            idType: new FormControl('', [Validators.required]),
            idNumber: new FormControl(null, [Validators.required, Validators.maxLength(20), Validators.pattern(/^[A-Z 0-9 -]+$/i)]),
            countryEmployment: new FormControl('', [Validators.required]),
            email: new FormControl(null, [Validators.required]),
            dateAdmission: new FormControl(),
            area: new FormControl('', [Validators.required]),
            state: new FormControl({value: '1', disabled: true}, [Validators.required]),
            registrationDate: new FormControl(),
        });

    }

    uppercaseInputSelected(input, field: string, space = false): void {
        let text: string = input.value;
        if (!space) {
            text = text.trim().split(' ').join('');
        }
        this.formEmployee.controls[field].patchValue(text.toUpperCase());
    }

    generateEmail(input, field: string): void {
        if (field === 'surname') {
            const surname = this.formEmployee.value.surname || '';
            this.formEmployee.controls.surname.patchValue(surname.trim());
        }

        if (field === 'name' || field === 'surname' || field === 'countryEmployment') {
            if (this.formEmployee.value.name && this.formEmployee.value.surname && this.formEmployee.value.countryEmployment) {
                const name = this.formEmployee.value.name.toLowerCase();
                let surname = this.formEmployee.value.surname.toLowerCase();
                surname = surname.split(' ').join('');
                const email = `${name}.${surname}@${DOMAIN[this.formEmployee.value.countryEmployment]}`;

                this.formEmployee.controls.email.patchValue(email);
            }
        }
    }

    saveChange(): void {
        console.log(this.formEmployee.value);
        console.log(this.formEmployee.valid);
    }

}

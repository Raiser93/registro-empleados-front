import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export interface EmployeeModel {
    name: string;
    otherName: string;
    surname: string;
    secondSurname: string;
    idType: number;
    idNumber: string;
    countryEmployment: number;
    email: string;
    dateAdmission: Date | string | number | NgbDateStruct;
    area: number;
    state: number;
    registrationDate?: Date | string | number;
    createdAt?: Date | string | number;
    updatedAt?: Date | string | number;
}
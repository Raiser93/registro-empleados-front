import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
    CustomDatesAdapterService,
    DateParserFormatterService,
    EmployeeService
} from './services.index';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        NgbModule
    ],
    providers: [
        { provide: NgbDateAdapter, useClass: CustomDatesAdapterService },
        { provide: NgbDateParserFormatter, useClass: DateParserFormatterService },
        EmployeeService
    ]
})
export class ServicesModule {}

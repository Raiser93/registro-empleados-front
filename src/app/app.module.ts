import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { SharedModule } from './shared/shared.module';
import { RegisterEmployeeComponent } from './pages/register-employee/register-employee.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Servicios
import { ServicesModule } from './services/services.module';
import { DatePipe } from './pipes/date.pipe';
import { AreaEmployeePipe } from './pipes/area-employee.pipe';
import { StateEmployeePipe } from './pipes/state-employee.pipe';
import { CountryEmployeePipe } from './pipes/country-employee.pipe';
import { TypeIdEmployeePipe } from './pipes/type-id-employee.pipe';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    RegisterEmployeeComponent,
    DatePipe,
    AreaEmployeePipe,
    StateEmployeePipe,
    CountryEmployeePipe,
    TypeIdEmployeePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // Servicios
    ServicesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { SharedModule } from './shared/shared.module';
import { RegisterEmployeeComponent } from './pages/register-employee/register-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    RegisterEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DatePickerComponent } from './date-picker/date-picker.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
{
  path: 'login', component: LoginComponent
},
{
  path: 'signup', component: SignupComponent
},
{
  path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]
},
{
  path: 'dynamicForm', component: DynamicFormComponent
},
{
  path: 'datePicker', component: DatePickerComponent
},
{
  path: '**', pathMatch: 'full', redirectTo: '/login'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

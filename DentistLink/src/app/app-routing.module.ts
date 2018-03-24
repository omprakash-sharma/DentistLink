import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component'
import { AdminComponent } from './admin/admin.component'
import { UsersComponent } from './users/users.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WelcomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'admin',
    component: HomeComponent
  },
  {
    path: 'user',
    component: UsersComponent
  },
  { 
    path: '**', 
    component: WelcomeComponent // can be put path not match component.
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

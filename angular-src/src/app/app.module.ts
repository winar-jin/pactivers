import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule,Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AuthGuard } from './guards/auth.guard';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import {FlashMessagesModule} from 'angular2-flash-messages';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { PlanService } from './services/plan.service';

const appRoutes:Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard]}
]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],
  providers: [ValidateService,AuthService,AuthGuard,PlanService],
  bootstrap: [AppComponent]
})
export class AppModule { }

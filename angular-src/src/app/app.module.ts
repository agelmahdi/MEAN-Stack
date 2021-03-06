import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router'
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { JwtModule } from "@auth0/angular-jwt";

import {ValidateService} from './services/validate.service'
import {AuthService} from './services/auth.service'

import {AuthGuard} from './guard/auth.guard'

import { from } from 'rxjs';
const appRoutes: Routes = [
  {path:'',component: HomeComponent ,canActivate:[AuthGuard]},
  {path:'register',component: RegisterComponent },
  {path:'login',component: LoginComponent },
  {path:'dashboard',component: DashboardComponent ,canActivate:[AuthGuard]},
  {path:'profile',component: ProfileComponent ,canActivate:[AuthGuard]},
  

]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem("id_token");
        },
      },
    }),
    FlashMessagesModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    
  ],
  providers: [ValidateService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

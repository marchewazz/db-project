import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterFormComponent } from './components/register-page/register-form/register-form.component';
import { LoginFormComponent } from './components/login-page/login-form/login-form.component';
import { SingleShowPageComponent } from './components/single-show-page/single-show-page.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterPageComponent,
    MainPageComponent,
    LoginPageComponent,
    RegisterFormComponent,
    LoginFormComponent,
    SingleShowPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

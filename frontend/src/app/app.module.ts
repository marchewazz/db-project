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
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { FriendPageComponent } from './components/friend-page/friend-page.component';
import { SearchToolComponent } from './components/search-tool/search-tool.component';
import { SearchResultsPageComponent } from './components/search-results-page/search-results-page.component';
import { ShowTileComponent } from './components/show-tile/show-tile.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterPageComponent,
    MainPageComponent,
    LoginPageComponent,
    RegisterFormComponent,
    LoginFormComponent,
    SingleShowPageComponent,
    ProfilePageComponent,
    FriendPageComponent,
    SearchToolComponent,
    SearchResultsPageComponent,
    ShowTileComponent,
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

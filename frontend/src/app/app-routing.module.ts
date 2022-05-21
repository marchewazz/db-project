import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainPageComponent } from './components/main-page/main-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SingleShowPageComponent } from './components/single-show-page/single-show-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { FriendPageComponent } from './components/friend-page/friend-page.component';
import { SearchResultsPageComponent } from './components/search-results-page/search-results-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent},
  { path: 'register', component: RegisterPageComponent},
  { path: 'login', component: LoginPageComponent},
  { path: 'show/:id', component: SingleShowPageComponent},
  { path: 'myprofile', component: ProfilePageComponent},
  { path: 'profile/:id', component: FriendPageComponent},
  { path: 'search/:phrase', component: SearchResultsPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

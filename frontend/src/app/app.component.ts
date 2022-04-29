import { Component } from '@angular/core';
import { NavigationStart, Router, Event } from '@angular/router';
import { AuthService } from './services/authService/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  isUserLogged: boolean = false;

  constructor(public router: Router, private as: AuthService){
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.as.checkUserData()
        setTimeout(() => {
          this.isUserLogged = this.as.isUserLogged()
        }, 100);
      }
    })
  }
}

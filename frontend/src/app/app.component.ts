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
  balance: any;

  constructor(public router: Router, private as: AuthService){
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.as.checkUserData()
        setInterval(() => {
          this.isUserLogged = this.as.isUserLogged()
        }, 1);
        setInterval(() => {
          if(this.isUserLogged) {
            this.as.getUserData().subscribe((res: any) => {
              this.balance = JSON.parse(res.userData).balance
            })
          }
        }, 1000)
      }
    })
  }

  logout() {
    this.redirect('/');
    this.as.logout().subscribe((res: any) => {
      localStorage.setItem("token", "");
      console.log(res);
    })
  }

  redirect(path: string){
    this.router.navigate([path]);
  }
}

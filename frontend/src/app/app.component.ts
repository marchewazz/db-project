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
        this.as.getUserData().subscribe((res: any) => {
          this.as.userData = JSON.parse(res.userData)
          this.balance = JSON.parse(res.userData).balance
        })
      }
    })
  }

  logout() {
    
    this.as.logout().subscribe((res: any) => {
      localStorage.setItem("token", "");
      this.redirect('/');
      console.log(res);
    })
  }

  redirect(path: string){
    this.router.navigate([path]);
  }
}

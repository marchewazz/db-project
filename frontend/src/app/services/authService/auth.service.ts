import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isTokenValid: boolean = false;

  constructor(private http: HttpClient) { }

  loginUser(userData: any): Observable<Object> {
    return this.http.post(`${environment.backendUrl}/users/login`, userData)
  }

  logout(): Observable<Object> {
    this.isTokenValid = false;
    return this.http.post(`${environment.backendUrl}/users/logout`, { "token": localStorage.getItem("token") })  
  }
  
  checkUserData(): void {
    if (localStorage.getItem("token")) {
      this.getUserData().subscribe((res: any) => {
        if(JSON.parse(res.userData) != []) this.isTokenValid = true
        else {
          this.isTokenValid = true
          localStorage.setItem("token", "")
        }
      })  
    } else {
      this.isTokenValid = false
      localStorage.setItem("token", "")
    }
  }

  getUserData(): Observable<Object> {
    return this.http.post(`${environment.backendUrl}/users/userdata`, { "token": localStorage.getItem("token") })
  }

  isUserLogged(): boolean {
    return this.isTokenValid
  }
}

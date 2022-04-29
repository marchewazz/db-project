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

  checkUserData(): void {
    this.http.post(`${environment.backendUrl}/users/userdata`, { "token": localStorage.getItem("token") }).subscribe((res: any) => {
      if(res.userData) this.isTokenValid = true
      else localStorage.setItem("token", "")
    })   
  }

  isUserLogged(): boolean {
    return this.isTokenValid
  }
}

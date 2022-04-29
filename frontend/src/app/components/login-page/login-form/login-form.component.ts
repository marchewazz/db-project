import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AuthService } from 'src/app/services/authService/auth.service';
import { isDataComplete, testEmailRegExp } from 'src/app/utilities';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  userEmail: FormControl = new FormControl();
  userPassword: FormControl = new FormControl();

  loginInfo: string = "";

  constructor(private as: AuthService) { }

  ngOnInit(): void {
  }

  loginUser(): void {
    const userData = {
      accountEmail: this.userEmail.value,
      accountPassword: this.userPassword.value,
    }

    if(!isDataComplete(userData)){
      this.loginInfo = "Pass all data!";
    } else {
      if(!testEmailRegExp(userData.accountEmail)){
        this.loginInfo = "Not valid email, eg. xyz@gmail.com";
        return
      } else {
        this.as.loginUser(userData).subscribe((res: any) => {      
          this.loginInfo = res.message;
          if(res.message === "Valid data!") localStorage.setItem("token", res.token)
        })
      }
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { UsersService } from 'src/app/services/usersService/users.service';

import { testEmailRegExp, isDataComplete, testPasswordRegExp, arePasswordsSame} from 'src/app/utilities';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  userEmail: FormControl = new FormControl();
  userFirstName: FormControl = new FormControl();
  userLastName: FormControl = new FormControl();
  userPassword: FormControl = new FormControl();
  userRepeatedPassword: FormControl = new FormControl();

  registerInfo : string = "";

  constructor(private us: UsersService) { }

  ngOnInit(): void {
  }

  registerUser(){
    const userData = {
      accountEmail: this.userEmail.value,
      accountFirstName: this.userFirstName.value,
      accountLastName: this.userLastName.value,
      accountPassword: this.userPassword.value,
    }
    if(!isDataComplete(userData)){
      this.registerInfo = "Pass all data!";
    } else {
      if(!testEmailRegExp(userData.accountEmail)){
        this.registerInfo = "Not valid email, eg. xyz@gmail.com";
        return
      } else if(!testPasswordRegExp(userData.accountPassword)){ 
        this.registerInfo = "Password doesn't match requirments";
        return
      } else if(!arePasswordsSame(userData.accountPassword, this.userRepeatedPassword.value)){ 
        this.registerInfo = "Passwords aren't the same";
        return
      } else {
        console.log(this.userFirstName.value);
        console.log(this.userLastName.value);
        console.log(this.userEmail.value);

        this.us.registerUser(userData).subscribe((res: any) => {
          this.registerInfo = res.message;
          console.log(res, this.registerInfo);
        })
      }
    }
  }
  
}

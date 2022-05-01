import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  
  userData: any;

  constructor(private as: AuthService) { }

  ngOnInit(): void {
    this.as.getUserData().subscribe((res: any) => {
      console.log(JSON.parse(res.userData));
      this.userData = JSON.parse(res.userData)
    })
  }

}

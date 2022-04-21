import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/usersService/users.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  constructor(private us: UsersService) { }

  ngOnInit(): void {
    this.us.x().subscribe((res: any) => {
      console.log(res);
    })
  }

}

import { Component, Input, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/authService/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  @Input() isTokenValid: any;

  constructor(private as: AuthService) { }

  ngOnInit(): void { }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/authService/auth.service';
import { ShowsService } from 'src/app/services/showsService/shows.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  
  userData: any;

  activeLoans: any = [];
  earlierLoans: any = [];

  constructor(private router: Router, private as: AuthService, private ss: ShowsService) { }

  ngOnInit(): void {
    this.as.getUserData().subscribe((res: any) => {
      this.userData = JSON.parse(res.userData);      
      this.activeLoans = this.userData.loans.filter((loan: any) =>  loan.state === "active");
      this.earlierLoans = this.userData.loans.filter((loan: any) =>  loan.state === "expired");
      for(const loan of this.activeLoans){
        this.ss.getOneShow({"showID": loan.showID}).subscribe((res: any) => {
          const show = JSON.parse(res.show)
          loan.showTitle = show.Title
          loan.showPoster = show.Poster
        })
      }
      for(const loan of this.earlierLoans){
        this.ss.getOneShow({"showID": loan.showID}).subscribe((res: any) => {
          const show = JSON.parse(res.show)
          loan.showTitle = show.Title
          loan.showPoster = show.Poster
        })
      }
    })
  }

  createDateFormat(date: any): string{
    return new Date(date).toLocaleString();
  }

  redirect(path: string): void{
    this.router.navigate([path]);
  }

  createPath(path: string, param: any): string{
    return path+param
  }
}

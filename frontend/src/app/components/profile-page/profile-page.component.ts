import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment.prod';

import { AuthService } from 'src/app/services/authService/auth.service';
import { ShowsService } from 'src/app/services/showsService/shows.service';
import { LoansService } from 'src/app/services/loansService/loans.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  
  userData: any;

  activeLoans: any = [];
  earlierLoans: any = [];

  loanInfo: string = "";

  enviroment = environment;

  constructor(private router: Router, private as: AuthService, private ss: ShowsService, private ls: LoansService) { }

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

  extendLoan(loanID: string, duration: string){
    const loanData = {
      "loanID": loanID,
      "duration": duration,
      "price": duration === "week" ? environment.extendWeekPrice : environment.extendMonthPrice,
      "accountNick": this.userData.accountNick
    }
    this.ls.extendLoan(loanData).subscribe((res: any) => {
      this.loanInfo = res.message
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

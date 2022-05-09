import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/services/authService/auth.service';
import { ShowsService } from 'src/app/services/showsService/shows.service';
import { LoansService } from 'src/app/services/loansService/loans.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-single-show-page',
  templateUrl: './single-show-page.component.html',
  styleUrls: ['./single-show-page.component.scss']
})
export class SingleShowPageComponent implements OnInit {

  show: any;
  showRatings: boolean = false;

  loanInfo: string = "";
  isShowLoaned: boolean = false;

  isUserLogged: boolean = false;
  
  enviroment = environment;

  constructor(private route: ActivatedRoute, private ss: ShowsService, private as: AuthService, private ls: LoansService) { }

  ngOnInit(): void {
    const showData = {
      showID: this.route.snapshot.paramMap.get('id')
    }
    this.ss.getOneShow(showData).subscribe((res: any) => {
      this.show = JSON.parse(res.show);
      setInterval(() => {
        this.isUserLogged = this.as.isUserLogged();
        if(this.isUserLogged) {
          this.as.getUserData().subscribe((res: any) => {
            const loans = JSON.parse(res.userData).loans;
            if(loans.filter((loan: any) => loan.showID === showData.showID && loan.state === "active").length) this.isShowLoaned = true;
          })
        }
      }, 250)
    })
  }
  loan(showID: string, duration: string) {
    this.as.getUserData().subscribe((res: any) => {
      const loanData = {
        "showID": showID,
        "duration": duration,
        "accountNick": JSON.parse(res.userData).accountNick,
        "price": duration === "week" ? environment.loanWeekPrice : environment.loanMonthPrice
      }
      this.ls.loan(loanData).subscribe((res: any) => {
        this.loanInfo = res.message;
      })
    })
    
  }
}

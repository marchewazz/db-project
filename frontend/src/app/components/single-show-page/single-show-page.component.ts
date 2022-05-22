import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concat } from 'rxjs';

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
  seasonNumber: any = "1";
  seasonEpisodes: any;

  loanInfo: string = "";
  isShowLoaned: boolean = false;

  isUserLogged: boolean = false;
  
  enviroment = environment;

  constructor(private router: Router, private route: ActivatedRoute, private ss: ShowsService, private as: AuthService, private ls: LoansService) { }

  ngOnInit(): void {
    let showData = {
      showID: this.route.snapshot.paramMap.get('id')
    }
    this.ss.getOneShow(showData).subscribe((res: any) => {
      this.show = JSON.parse(res.show);
      this.updateEpisodes()
      setInterval(() => {
        this.isUserLogged = this.as.isUserLogged();
        if(this.isUserLogged) {
          this.as.getUserData().subscribe((res: any) => {
            const loans = JSON.parse(res.userData).loans;
            if(loans.filter((loan: any) => loan.showID === showData.showID && loan.state === "active").length) this.isShowLoaned = true;
          })
        }
      }, 1000)
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

  updateEpisodes(){
    let showData = {
      showID: this.route.snapshot.paramMap.get('id'),
      seasonNumber: this.seasonNumber
    }
    this.ss.getSeason(showData).subscribe((res: any) => {
      this.seasonEpisodes = JSON.parse(res.season).Episodes
    })
  }

  createNumber(number: string){
    return Number(number)
  }

  redirect(path: string): void{
    this.router.navigate([path]);
  }

  createPath(path: string, param: any): string{
    return path+param
  }
}

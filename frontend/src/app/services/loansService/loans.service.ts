import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoansService {

  constructor(private http: HttpClient) { }

  loan(loanData: any): Observable<Object> {
    return this.http.post(`${environment.backendUrl}/loans/loan`, loanData)
  }

  extendLoan(loanData: any): Observable<Object> {
    return this.http.post(`${environment.backendUrl}/loans/extendloan`, loanData)

  }
}

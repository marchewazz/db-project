import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(private http: HttpClient) { }

  getUserData(accountID: any): Observable<Object> {
    return this.http.post(`${environment.backendUrl}/friends/getuserdata`, { "accountID": accountID })
  }

  sendInvitation(invitationData: any): Observable<Object> {
    return this.http.post(`${environment.backendUrl}/friends/sendinvitation`, invitationData)
  }

  cancelInvitation(invitationData: any): Observable<Object> {
    return this.http.post(`${environment.backendUrl}/friends/cancelinvitation`, invitationData)
  }
  
  answerInvitation(invitationData: any): Observable<Object> {
    return this.http.post(`${environment.backendUrl}/friends/answerinvitation`, invitationData)
  }

  deleteFriend(invitationData: any): Observable<Object> {
    return this.http.post(`${environment.backendUrl}/friends/deletefriend`, invitationData)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {

  constructor(private http: HttpClient) { }

  getOneShow(showData: any): Observable<Object>{
    return this.http.post(`${environment.backendUrl}/shows/getone`, showData)
  }

  getSeason(showData: any): Observable<Object>{
    return this.http.post(`${environment.backendUrl}/shows/getseason`, showData)
  }

  getEpisode(showData: any): Observable<Object>{
    return this.http.post(`${environment.backendUrl}/shows/getepisode`, showData)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  searchForPhrase(phrase: any): Observable<Object> {
    return this.http.post(`${environment.backendUrl}/search/`, { phrase: phrase })
  }

}

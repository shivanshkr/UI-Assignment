import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DomainServiceService {
  apiUrl = 'http://localhost:3000/domainLists';

  constructor(private http: HttpClient) {}

  getDomainList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  addDomain(data: any): Observable<any> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.post<any>(this.apiUrl, data, { headers: headers });
  }
}

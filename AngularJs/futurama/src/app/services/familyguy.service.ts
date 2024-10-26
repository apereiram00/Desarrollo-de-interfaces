import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FamilyguyService {
  private apiUrl = 'https://api.tvmaze.com/shows/84/cast';

  constructor(private http: HttpClient) {}

  getCharacters(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}

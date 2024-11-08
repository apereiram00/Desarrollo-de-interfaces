import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enclosure } from '../models/enclosure.model';  

@Injectable({
  providedIn: 'root'
})
export class EnclosureService {

  private apiUrl = 'http://localhost:3000/enclosures';  

  constructor(private http: HttpClient) { }

  getEnclosures(): Observable<Enclosure[]> {
    return this.http.get<Enclosure[]>(this.apiUrl);  
  }

  upgradeEnclosure(enclosureId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/upgrade`, { enclosureId });
  }
}

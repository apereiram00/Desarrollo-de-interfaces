import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParkService {
  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  getParkStatus(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(`${this.apiUrl}/park/status`, { headers });
  }

  getAllDinosaurs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/data/dinosaurs`);
  }

  getAllEnclosures(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/data/enclosures`);
  }
}

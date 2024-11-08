import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dinosaur } from '../models/dinosaur.model'; 

@Injectable({
  providedIn: 'root'
})
export class DinosaurService {

  private apiUrl = 'http://localhost:3000/dinosaurs';  

  constructor(private http: HttpClient) { }

  getDinosaurs(): Observable<Dinosaur[]> {
    return this.http.get<Dinosaur[]>(this.apiUrl); 
  }

  buyDinosaur(dinosaurId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/buy`, { dinosaurId });
  }
}

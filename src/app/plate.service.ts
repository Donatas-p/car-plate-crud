import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Plate } from './plate';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlateService {

  constructor(private http: HttpClient) { }

  getPlates(): Observable<Plate[]> {
    return this.http.get<Plate[]>("http://localhost:8000/plates");
  }

  getPlate(id: string): Observable<Plate[]> {
    return this.http.get<Plate[]>("http://localhost:8000/plate/" + id);
  }
}

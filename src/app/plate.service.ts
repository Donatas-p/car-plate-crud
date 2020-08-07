import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Plate } from './plate';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': "application/json"
  })
}
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

  addPlate(plate: string, name: string, surname: string) {
    return this.http.get<Plate[]>("http://localhost:8000/addPlate/"+ plate + "/" + name + "/" + surname);
  }
  deletePlate(id: string) {
    return this.http.get<Plate[]>("http://localhost:8000/removePlate/"+ id);
  }
  editPlate(data: Plate) {
    return this.http.get<Plate[]>("http://localhost:8000/editPlate/"+data.id+"/"+data.plate+"/"+data.name+"/"+data.surname);
  }
}

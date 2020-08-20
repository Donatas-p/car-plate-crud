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

  getPlates(page: number): Observable<Plate[]> {
    return this.http.get<Plate[]>("http://localhost:8000/plates/page/" + page);
  }

  getLastPage(): Observable<number> {
    console.log(this.http.get<number>("http://localhost:8000/platesCount"));
    return this.http.get<number>("http://localhost:8000/platesCount");
  }

  getPlate(id: string): Observable<Plate[]> {
    return this.http.get<Plate[]>("http://localhost:8000/plate/" + id);
  }

  addPlate(data: Plate) {
    return this.http.get<Plate[]>("http://localhost:8000/addPlate/"+ data.plate + "/" + data.name + "/" + data.surname);
  }
  deletePlate(id: string) {
    return this.http.get<Plate[]>("http://localhost:8000/removePlate/"+ id);
  }
  editPlate(data: Plate) {
    return this.http.get<Plate[]>("http://localhost:8000/editPlate/"+data.id+"/"+data.plate+"/"+data.name+"/"+data.surname);
  }

  searchPlates(searchString: string): Observable<Plate[]> {
    return this.http.get<Plate[]>("http://localhost:8000/search/" + searchString);
  }
}

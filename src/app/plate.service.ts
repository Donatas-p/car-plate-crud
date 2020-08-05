import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PLATES } from './mock-plates';
import { Plate } from './plate';

@Injectable({
  providedIn: 'root'
})
export class PlateService {

  constructor() { }

  getPlates(): Observable<Plate[]> {
    const plates: Plate[] = PLATES;
    return of(plates);
  }
}

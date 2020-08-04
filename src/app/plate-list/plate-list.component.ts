import { Component, OnInit } from '@angular/core';
import { Plate } from '../plate';
import { PLATES } from '../mock-plates';

@Component({
  selector: 'app-plate-list',
  templateUrl: './plate-list.component.html',
  styleUrls: ['./plate-list.component.scss']
})
export class PlateListComponent implements OnInit {

  plates: Plate[] = [];
  displayedColumns: string[] = ['plate', 'name', 'surname']
  isLoadingResults = true;

  constructor() { }

  ngOnInit(): void {
    this.plates = PLATES;
    console.log(this.plates);
  }

}

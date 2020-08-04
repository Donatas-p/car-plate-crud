import { Component, OnInit } from '@angular/core';
import { Plates } from '../plates';

@Component({
  selector: 'app-plate-list',
  templateUrl: './plate-list.component.html',
  styleUrls: ['./plate-list.component.scss']
})
export class PlateListComponent implements OnInit {

  displayedColumns: string[] = ['plate', 'name', 'surname']
  isLoadingResults = true;

  constructor() { }

  ngOnInit(): void {
  }

}

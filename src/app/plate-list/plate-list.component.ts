import { Component, OnInit } from '@angular/core';
import { Plate } from '../plate';
import { PlateService } from '../plate.service';

@Component({
  selector: 'app-plate-list',
  templateUrl: './plate-list.component.html',
  styleUrls: ['./plate-list.component.scss']
})
export class PlateListComponent implements OnInit {

  plates: Plate[] = [];
  displayedColumns: string[] = ['plate', 'name', 'surname']
  isLoadingResults = true;

  constructor(private plateService: PlateService) { }

  ngOnInit(): void {
    this.getPlates();
    console.log(this.plates);
  }

  getPlates(): void {
    this.plateService
      .getPlates()
      .subscribe(plates => (this.plates = plates));
  }

}

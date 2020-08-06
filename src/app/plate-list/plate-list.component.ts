import { Component, OnInit, Inject } from '@angular/core';
import { Plate } from '../plate';
import { PlateService } from '../plate.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  dialogPlate: string;
  plateId: string;
}
@Component({
  selector: 'app-plate-list',
  templateUrl: './plate-list.component.html',
  styleUrls: ['./plate-list.component.scss']
})
export class PlateListComponent implements OnInit {

  plates: Plate[] = [];
  displayedColumns: string[] = ['plate', 'name', 'surname']
  isLoadingResults = true;

  constructor(private plateService: PlateService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPlates();
    console.log(this.plates);
  }

  getPlates(): void {
    this.plateService
      .getPlates()
      .subscribe(plates => (this.plates = plates));
  }

  openDeleteDialog(plate: string, id: string): void {
    const dialogRef = this.dialog.open(PlateListDeleteDialog, {
      data: {
        dialogPlate: plate,
        plateId: id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.deletePlate(result);
    });
  }

  deletePlate(id: string): void {
    this.plateService
      .deletePlate(id)
      .subscribe();
    this.getPlates();
  }

}

@Component({
  selector: 'plate-list-delete-dialog',
  templateUrl: 'plate-list-delete-dialog.html',
})
export class PlateListDeleteDialog {

  constructor(
    public dialogRef: MatDialogRef<PlateListDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}


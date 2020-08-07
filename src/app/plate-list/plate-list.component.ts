import { Component, OnInit, Inject } from '@angular/core';
import { Plate } from '../plate';
import { PlateService } from '../plate.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
export interface DialogData {
  dialogPlate: string;
  plateId: string;
  plateData: Plate;
}
@Component({
  selector: 'app-plate-list',
  templateUrl: './plate-list.component.html',
  styleUrls: ['./plate-list.component.scss'],
})
export class PlateListComponent implements OnInit {
  plates: Plate[] = [];
  displayedColumns: string[] = ['plate', 'name', 'surname'];
  isLoadingResults = true;

  constructor(private plateService: PlateService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getPlates();
  }

  getPlates(): void {
    this.plateService.getPlates().subscribe((plates) => (this.plates = plates));
  }

  openDeleteDialog(plate: string, id: string): void {
    const dialogRef = this.dialog.open(PlateListDeleteDialog, {
      data: {
        dialogPlate: plate,
        plateId: id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(typeof(result) !='undefined') this.deletePlate(result);
    });
  }

  openEditDialog(data: Plate): void {
    const dialogRef = this.dialog.open(PlateListEditDialog, {
      data: {
        plateData: data,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(typeof(result) !='undefined') {
        if (JSON.stringify(result) === JSON.stringify(data)) {
          return;
        } else {
          this.editPlate(result);
        }
      }
    });
  }

  deletePlate(id: string): void {
    this.plateService.deletePlate(id).subscribe();
    this.getPlates();
  }

  editPlate(data: Plate): void {
    this.plateService.editPlate(data).subscribe();
    this.getPlates();
  }
}

// Modal plate delete class
@Component({
  selector: 'plate-list-delete-dialog',
  templateUrl: 'plate-list-delete-dialog.html',
})
export class PlateListDeleteDialog {
  constructor(
    public dialogRef: MatDialogRef<PlateListDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

// Modal plate Edit class
@Component({
  selector: 'plate-list-edit-dialog',
  templateUrl: 'plate-list-edit-dialog.html',
})
export class PlateListEditDialog {
  editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PlateListEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      id: this.data.plateData.id,
      plate: this.data.plateData.plate,
      name: this.data.plateData.name,
      surname: this.data.plateData.surname,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

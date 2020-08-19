import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Plate } from '../plate';
import { PlateService } from '../plate.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-add-plate',
  templateUrl: './add-plate.component.html',
  styleUrls: ['./add-plate.component.scss']
})
export class AddPlateComponent implements OnInit {

  addForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private plateService: PlateService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  submit(formData: any) {
    this.plateService
      .addPlate(formData[0], formData[1], formData[2])
      .subscribe();
  }

}

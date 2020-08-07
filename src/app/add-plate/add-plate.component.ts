import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    this.addForm = this.fb.group({
      plate: '',
      name: '',
      surname: ''
    });
  }

  submitAdd() {
    this.plateService
      .addPlate(this.addForm.value.plate, this.addForm.value.name, this.addForm.value.surname)
      .subscribe();
    this.addForm = this.fb.group({
      plate: '',
      name: '',
      surname: ''
    });

  }

}

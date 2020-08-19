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
    this.addForm = this.fb.group({
      plate: ['',
        [
          Validators.required,
          Validators.pattern('[A-Z]{3}[0-9]{3}|[H][0-9]{5}|[E][A-Z][0-9]{4}[A-Z0-9]+{1,6}')
        ]
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z]+')
        ]
      ],
      surname: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z]+')
        ]
      ]
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

  get plate() {
    return this.addForm.get('plate');
  }

  get name() {
    return this.addForm.get('name');
  }

  get surname() {
    return this.addForm.get('surname');
  }

}

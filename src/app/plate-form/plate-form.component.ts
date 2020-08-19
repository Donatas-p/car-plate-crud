import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Plate } from '../plate';
import { PlateService } from '../plate.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-plate-form',
  templateUrl: './plate-form.component.html',
  styleUrls: ['./plate-form.component.scss']
})
export class PlateFormComponent implements OnInit {

  @Output() onFormSubmit = new EventEmitter<Plate>();
  @Input() buttonText: string;

  @Input() editId: string;
  @Input() editPlate: string;
  @Input() editName: string;
  @Input() editSurname: string;

  plateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private plateService: PlateService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.plateForm = this.fb.group({
      plate: [
        this.editPlate,
        [
          Validators.required,
          Validators.pattern('^([A-Z]{3}[0-9]{3}|[H][0-9]{5}|[E][A-Z][0-9]{4}|[A-Z0-9]{1,6})$')
        ]
      ],
      name: [
        this.editName,
        [
          Validators.required,
          Validators.pattern('[A-Z][a-z]+')
        ]
      ],
      surname: [
        this.editSurname,
        [
          Validators.required,
          Validators.pattern('[A-Z][a-z]+')
        ]
      ]
    });
  }

  submit() {
    this.onFormSubmit.emit({"id":this.editId,"plate":this.plateForm.value.plate, "name":this.plateForm.value.name, "surname":this.plateForm.value.surname});
    this.plateForm = this.fb.group({
      plate: '',
      name: '',
      surname: ''
    });

  }

  get plate() {
    return this.plateForm.get('plate');
  }

  get name() {
    return this.plateForm.get('name');
  }

  get surname() {
    return this.plateForm.get('surname');
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-plate',
  templateUrl: './add-plate.component.html',
  styleUrls: ['./add-plate.component.scss']
})
export class AddPlateComponent implements OnInit {

  addForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      plate: '',
      name: '',
      surname: ''
    });

    this.addForm.valueChanges.subscribe(console.log);
  }

  submitAdd() {

  }

}

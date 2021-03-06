import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlateListComponent } from './plate-list/plate-list.component';
import { AddPlateComponent } from './add-plate/add-plate.component';

const routes: Routes = [
  {
    path: 'plates',
    component: PlateListComponent,
    data: { title: "List of Number Plates" }
  },
  {
    path: 'add-plate',
    component: AddPlateComponent,
    data: { title: "Add a new Number Plate" }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { FlightsComponent } from './feature/flights/flights.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'flights', component: FlightsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

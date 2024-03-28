import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  opened: boolean = true;

  ngOnInit() { }
  
  sideNavToggle() {
    this.opened = !this.opened;
  }
}

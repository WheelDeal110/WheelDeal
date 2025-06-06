import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
   styles: [`
    @keyframes fadeIn {
      from {opacity: 0;}
      to {opacity: 1;}
    }
    .animate-fadeIn {
      animation: fadeIn 0.6s ease-in-out forwards;
    }
  `]
})
export class DashboardComponent {

}

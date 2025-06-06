import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
 styles: [`
    @keyframes fadeIn {
      from {opacity: 0;}
      to {opacity: 1;}
    }
    .animate-fadeIn {
      animation: fadeIn 0.5s ease-in-out forwards;
    }
  `]

})
export class SettingsComponent {
   businessMode = false;
}

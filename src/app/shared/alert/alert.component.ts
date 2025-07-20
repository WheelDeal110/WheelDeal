import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
   type: 'success' | 'error' = 'success';
    message: string = '';
    show = false;

  showAlert(type: 'success' | 'error', message: string) {
    this.type = type;
    this.message = message;
    this.show = true;

    setTimeout(() => {
      this.show = false;
    }, 3000); // Auto-hide after 3 seconds
  }
}

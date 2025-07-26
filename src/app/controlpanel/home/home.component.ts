import { Component } from '@angular/core';
import { AuthService } from 'src/app/appServices/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showAccounts = false;

  constructor(private auth:AuthService) {
    
  }
  
  toggleAccounts() {
    this.showAccounts = !this.showAccounts;
  }

  logout()
  {
    this.auth.logoutCurrentSession();
  }
}

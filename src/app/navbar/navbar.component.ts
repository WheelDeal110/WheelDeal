import { Component } from '@angular/core';
import { AuthService } from '../appServices/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
 isOpen = false;
 isLoggedIn = false;
  isDropdownOpen = false;

 constructor(private auth:AuthService) {
   this.checkLoginStatus();

   this.auth.currentToken$.subscribe(token => {
      this.isLoggedIn = !!token && !this.auth.isTokenExpired();
    });
 }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  
  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

   logout(): void {
    this.auth.logoutCurrentSession();
  }

  checkLoginStatus() {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;
  }
}

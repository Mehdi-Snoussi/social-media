import { Component } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isUserConnected = false;
  constructor(private authService: AuthService) {
    this.isUserConnected = this.authService.isAuthenticated();
    console.log(this.authService.getUserConnectedInfo());
  }

  logout() {
    this.authService.clearData()
  }
}

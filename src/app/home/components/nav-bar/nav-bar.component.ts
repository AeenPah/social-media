import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  constructor(private router: Router, private authService: AuthService) {}

  logout() {
    console.log(this.authService.loggedIn);
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

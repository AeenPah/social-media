import { Injectable } from '@angular/core';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn: boolean = false;

  constructor(private userDataService: UserDataService) {}

  login() {
    this.loggedIn = true;
    localStorage.setItem('UserId', this.userDataService.userData.id);
  }
  logout() {
    this.loggedIn = false;
    localStorage.setItem('UserId', '0');
  }
  isAuthenticated() {
    return this.loggedIn;
  }
}

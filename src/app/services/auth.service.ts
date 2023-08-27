import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn: boolean = false;

  constructor() {}

  login(id: any) {
    this.loggedIn = true;
    localStorage.setItem('UserId', id);
  }
  logout() {
    this.loggedIn = false;
    localStorage.setItem('UserId', '0');
  }
  isAuthenticated() {
    return this.loggedIn;
  }
}

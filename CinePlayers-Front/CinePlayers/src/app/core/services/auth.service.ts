import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  constructor() {
    this.isAuthenticated = !!localStorage.getItem('isAuthenticated');
  }

  login(username: string, password: string): boolean {
    // Mock authentication logic
    const validUser = 'user@example.com';
    const validAdmin = 'admin@example.com';
    const validPassword = '123456';

    if ((username === validUser || username === validAdmin) && password === validPassword) {
      this.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      return true;
    }
    this.isAuthenticated = false;
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    localStorage.removeItem('password');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  checkStoredCredentials(): boolean {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    if (username && password) {
      return this.login(username, password);
    }
    return false;
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardCodedAuthenticationService {

  constructor() { }

  // Utility to check if sessionStorage is available
  isSessionStorageAvailable(): boolean {
    try {
      return typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined';
    } catch (e) {
      return false;
    }
  }

  autheticate(username: string, password: string): boolean {
    if (this.isSessionStorageAvailable()) {
      sessionStorage.setItem('authenticatedUser', username);
      return true;
    } else {
      return false;
    }
  }

  isUserLoggedIn(): boolean {
    if (this.isSessionStorageAvailable() && sessionStorage.getItem("authenticatedUser") != null) {
      return true;
    } else {
      return false;
    }
  }

  userLogout() {
    if (this.isSessionStorageAvailable()) {
      sessionStorage.removeItem('authenticatedUser');
    }
  }
}

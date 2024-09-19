import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BACK_END_API } from '../../app.constants';

const AUTH_TOKEN = 'authToken';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthService {

  constructor(private httpClient: HttpClient) {
  }

  handleUserLogin(username: string, password: string) {
    const basicAuthHeaderString = 'Basic ' + btoa(username + ':' + password);
    sessionStorage.setItem(AUTH_TOKEN, basicAuthHeaderString);

    return this.httpClient.get<BasicAuthResponse>(
      `${BACK_END_API}/user/auth/${username}/${password}`);
  }

  // Utility to check if sessionStorage is available
  isSessionStorageAvailable(): boolean {
    try {
      return typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined';
    } catch (e) {
      return false;
    }
  }

  getAuthenticateToken() {
    return sessionStorage.getItem(AUTH_TOKEN);
  }

  isUserLoggedIn(): boolean {
    if (this.isSessionStorageAvailable() && sessionStorage.getItem(AUTH_TOKEN) != null) {
      return true;
    } else {
      return false;
    }
  }

  userLogout() {
    if (this.isSessionStorageAvailable()) {
      sessionStorage.removeItem(AUTH_TOKEN);
    }
  }

}

class BasicAuthResponse {
  message: string = '';
  constructor(message: string) {
  }
}

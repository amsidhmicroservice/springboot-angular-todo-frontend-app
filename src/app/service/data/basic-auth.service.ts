import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AUTH_TOKEN, AUTHENTICATED_USER, BACK_END_API } from '../../app.constants';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BasicAuthService {

  constructor(private httpClient: HttpClient) {
  }

  handleUserLogin(username: string, password: string) {
    return this.httpClient.post<JwtTokenResponse>(`${BACK_END_API}/authenticate`, { username, password }).pipe(
      map(data => {
        sessionStorage.setItem(AUTH_TOKEN, `Bearer ${data.token}`);
        sessionStorage.setItem(AUTHENTICATED_USER, username);
        return data;
      }
      )
    );
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

class JwtTokenResponse {
  token: string = '';
  constructor(token: string) {
    this.token = token;
  }
}

class JwtTokenRequest {
  username: string;
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
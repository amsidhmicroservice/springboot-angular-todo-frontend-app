import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { BasicAuthService } from '../service/data/basic-auth.service';
import { HardCodedAuthenticationService } from '../service/hard-coded-authentication.service';
import { AUTH_TOKEN } from '../app.constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = 'dummy'
  password: string = ''
  errorMessage: string = 'Invalid credentials'
  invalidLogin: boolean = false

  constructor(public route: Router, public hardCodedAuthenticatedService: HardCodedAuthenticationService, public basicAuthService: BasicAuthService) {
  }

  handleLogin(): void {
    if (this.hardCodedAuthenticatedService.autheticate(this.username, this.password)) {
      console.log('Valid User')
      this.route.navigate(['welcome', this.username])
      this.invalidLogin = false;
    } else {
      console.log('InValid User')
      this.invalidLogin = true;
    }
    console.log("username :" + this.username + " and password:" + this.password)
  }


  handleBasicAuthLogin(): void {
    this.basicAuthService.handleUserLogin(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Valid User')
        this.route.navigate(['welcome', this.username])
        this.invalidLogin = false;
      },
      error: (error) => {
        console.log('InValid User')
        this.invalidLogin = true;
      },
      complete: () => {
        console.log('API call completed');
      }
    });
  }

}

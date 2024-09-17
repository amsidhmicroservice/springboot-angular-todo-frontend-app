import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { HardCodedAuthenticationService } from '../service/hard-coded-authentication.service';


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

  route: Router
  constructor(route: Router, public hardCodedAuthenticatedService: HardCodedAuthenticationService) {
    this.route = route
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

 
}

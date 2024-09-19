import { Component, OnInit } from '@angular/core';
import { BasicAuthService } from '../service/data/basic-auth.service';
import { HardCodedAuthenticationService } from '../service/hard-coded-authentication.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit {

  constructor(public hardcodeAuthenticatedService: HardCodedAuthenticationService, public basicAuthService: BasicAuthService) {

  }

  ngOnInit(): void {
    this.basicAuthService.userLogout();
  }

}

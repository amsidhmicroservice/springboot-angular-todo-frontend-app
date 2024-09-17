import { Component,  OnInit } from '@angular/core';
import { HardCodedAuthenticationService } from '../service/hard-coded-authentication.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit{

  constructor(public hardcodeAuthenticatedService: HardCodedAuthenticationService) {

  }

  ngOnInit(): void {
     this.hardcodeAuthenticatedService.userLogout();
  }

}

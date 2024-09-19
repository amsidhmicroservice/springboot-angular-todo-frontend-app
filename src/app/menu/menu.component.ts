import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BasicAuthService } from '../service/data/basic-auth.service';
import { HardCodedAuthenticationService } from '../service/hard-coded-authentication.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  constructor(public hardCodedAuthenticatedService: HardCodedAuthenticationService, public basicAuthService: BasicAuthService) {

  }


}

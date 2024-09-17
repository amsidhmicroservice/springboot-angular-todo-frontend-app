import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';
import { TodolistComponent } from "../todolist/todolist.component";
import { NgIf } from '@angular/common';
import { empty } from 'rxjs';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [TodolistComponent, RouterLink, NgIf],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  message: string = "Welcome-Component Page"
  name: string
  backendMessage?: string;
  backendErrorMessage?: string
  constructor(activatedRoute: ActivatedRoute, private welcomeDataService: WelcomeDataService) {
    this.name = activatedRoute.snapshot.params['name']
  }

  getWelcomeMessage() {
    this.welcomeDataService.executeHelloWorldBeanApi().subscribe({
      next: (response) => {
        console.log('Received JSON:', response);
        this.backendMessage = response.message;
        this.backendErrorMessage = undefined;
      },
      error: (error) => {
        console.error(error.message);
        this.backendErrorMessage = error.message;
        this.backendMessage = undefined
      },
      complete: () => {
        console.log('API call completed');
      }
    });
  }


  getWelcomeMessageWithPathVariable() {
    this.welcomeDataService.executeHelloWorldBeanWithPathVariableApi(this.name).subscribe({
      next: (response) => {
        console.log('Received JSON:', response);
        this.backendMessage = response.message;
        this.backendErrorMessage = undefined;
      },
      error: (error) => {
        console.error(error.message);
        this.backendErrorMessage = error.message;
        this.backendMessage = undefined
      },
      complete: () => {
        console.log('API call completed');
      }
    });
  }

}

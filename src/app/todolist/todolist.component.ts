import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoDataService, Todo } from '../service/data/todo-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css'
})
export class TodolistComponent {

  todos?: Todo[]
  message?: string = undefined

  constructor(private todoDataService: TodoDataService, private router: Router) {
    const username = sessionStorage.getItem('authenticatedUser') || 'dummy';
    this.todoDataService.retriveAllToDos(username).subscribe({
      next: (response) => {
        console.log('Received JSON:', response);
        this.todos = response.todos;
      },
      error: (error) => {
        console.error(error.message);
        this.todos = undefined
      },
      complete: () => {
        console.log('API call completed');
      }
    });
  }

  deleteTodo(todoId: number) {
    console.info("Deleting todo with todoId:", todoId)
    this.todoDataService.deleteTodo('dummy', todoId).subscribe({
      next: (response) => {
        console.log('Received JSON:', response);
        this.todos = response.todos;
        this.message = `Delete of Todo ${todoId} successful`
      },
      error: (error) => {
        console.error(error.message);
        this.todos = undefined
      },
      complete: () => {
        console.log('API call completed');
      }
    });
  }

  updateTodo(todoId: number) {
    this.router.navigate(['todo', todoId])
  }

  createTodo() {
    this.router.navigate(['addTodo'])
  }

}




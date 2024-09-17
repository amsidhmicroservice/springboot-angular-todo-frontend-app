import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Todo, TodoDataService } from '../service/data/todo-data.service';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css'
})
export class AddTodoComponent {

  todo: Todo = new Todo(-1, '', false, new Date())
  username: string
  constructor(private todoDataService: TodoDataService, private router: Router) {
    
    this.username = sessionStorage.getItem('authenticatedUser') || 'dummy';
  }

  createTodo() {
    this.todoDataService.createTodo(this.username, this.todo).subscribe({
      next: (response) => {
        console.log(`Todo saved successfully`)
        this.router.navigate(['todos'])
      },
      error: (error) => {
        console.error(error.message);
      },
      complete: () => {
        console.log('API call completed');
      }
    });
  }


  backToTodos() {
    this.router.navigate(['todos'])
  }
}

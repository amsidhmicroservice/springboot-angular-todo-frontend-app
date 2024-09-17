import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo, TodoDataService } from '../service/data/todo-data.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {

  todo: Todo = new Todo(-1, '', false, new Date())
  username: string
  constructor(private todoDataService: TodoDataService, activatedRoute: ActivatedRoute, private router: Router) {
    const todoId = activatedRoute.snapshot.params['todoId']
    this.username = sessionStorage.getItem('authenticatedUser') || 'dummy';

    this.todoDataService.getTodo(this.username, todoId).subscribe({
      next: (response) => {
        console.log('Received JSON:', response);
        this.todo = response;
      }
    });

  }

  saveTodo() {
    this.todoDataService.updateTodo(this.username, this.todo.todoId, this.todo).subscribe({
      next: (response) => {
        console.log(`Todo ${this.todo.todoId} updated successfully`)
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

  backToTodos(){
    this.router.navigate(['todos'])
  }

}

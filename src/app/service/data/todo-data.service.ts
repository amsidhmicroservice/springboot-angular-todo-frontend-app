import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(private httpClient: HttpClient) {
  }

  retriveAllToDos(username: string) {
    return this.httpClient.get<User>(`http://localhost:8181/user/${username}/todos`);
  }

  createTodo(username: string, todo: Todo) {
    return this.httpClient.post<User>(`http://localhost:8181/user/${username}/todos`, todo);
  }


  updateTodo(username: string, todoId: number, todo: Todo) {
    return this.httpClient.put<User>(`http://localhost:8181/user/${username}/todos/${todoId}`, todo);
  }

  deleteTodo(username: string, todoId: number) {
    return this.httpClient.delete<User>(`http://localhost:8181/user/${username}/todos/${todoId}`);
  }

  getTodo(username: string, todoId: number) {
    return this.httpClient.get<Todo>(`http://localhost:8181/user/${username}/todos/${todoId}`);
  }

  

}

export class User {
  constructor(public username: string,
    public todos: Todo[]) { }
}

export class Todo {
  constructor(public todoId: number,
    public description: string,
    public isDone?: boolean,
    public targetDate?: Date) { }
}
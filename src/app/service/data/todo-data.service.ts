import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BACK_END_API } from '../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(private httpClient: HttpClient) {
  }

  retriveAllToDos(username: string) {
    return this.httpClient.get<User>(`${BACK_END_API}/user/${username}/todos`);
  }

  createTodo(username: string, todo: Todo) {
    return this.httpClient.post<User>(`${BACK_END_API}/user/${username}/todos`, todo);
  }


  updateTodo(username: string, todoId: number, todo: Todo) {
    return this.httpClient.put<User>(`${BACK_END_API}/user/${username}/todos/${todoId}`, todo);
  }

  deleteTodo(username: string, todoId: number) {
    return this.httpClient.delete<User>(`${BACK_END_API}/user/${username}/todos/${todoId}`);
  }

  getTodo(username: string, todoId: number) {
    return this.httpClient.get<Todo>(`${BACK_END_API}/user/${username}/todos/${todoId}`);
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
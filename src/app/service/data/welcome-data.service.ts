import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WelcomeDataService {

  constructor(private httpClient: HttpClient) {
  }

  executeHelloWorldBeanApi() {
    return this.httpClient.get<HelloWorldBean>("http://localhost:8181/hello-world-bean");
  }

  executeHelloWorldBeanWithPathVariableApi(username:string) {
    return this.httpClient.get<HelloWorldBean>(`http://localhost:8181/hello-world-bean/${username}`);
  }
}

class HelloWorldBean {
  message?: string;
}
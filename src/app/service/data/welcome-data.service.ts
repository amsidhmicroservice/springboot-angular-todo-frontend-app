import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BACK_END_API } from '../../app.constants';

@Injectable({
  providedIn: 'root',
})
export class WelcomeDataService {

  constructor(private httpClient: HttpClient) {
  }

  executeHelloWorldBeanApi() {
    return this.httpClient.get<HelloWorldBean>(`${BACK_END_API}/hello-world-bean`);
  }

  executeHelloWorldBeanWithPathVariableApi(username:string) {
    return this.httpClient.get<HelloWorldBean>(`${BACK_END_API}/hello-world-bean/${username}`);
  }
}

class HelloWorldBean {
  message?: string;
}
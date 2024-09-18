import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorsService {

  constructor() { }
}

export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  console.log('Calling backend API-> ' + req.url);
  return next(req);
}

export function httpBasicAuthInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  console.log('Inside HttpInterceptorForBasicAuthService');

  let username = 'dummy';
  let password = 'Pass@123';
  let basicAuthHeaderString = 'Basic ' + btoa(username + ':' + password);

  let clonedRequest = request.clone({
    setHeaders: {
      Authorization: basicAuthHeaderString
    }
  });

  console.log('Interceptor executed, header added:', clonedRequest);
  return next(clonedRequest);
}
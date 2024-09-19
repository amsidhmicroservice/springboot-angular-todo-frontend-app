import { HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BasicAuthService } from '../data/basic-auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorsService {

  constructor() { }
}

export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  console.log('Request API-> ' + req.url);
  return next(req).pipe(tap(event => {
    if (event.type === HttpEventType.Response) {
      console.log(req.url, 'returned a response with status', event.status);
    }
  }));;
}

export function httpBasicAuthInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  console.log('Inside HttpInterceptorForBasicAuthService');
  const authToken = inject(BasicAuthService).getAuthenticateToken()

  if (authToken) {
    console.log("authToken=" + authToken)
    request = request.clone({
      headers: request.headers.set('Authorization', authToken)
    });
    console.log('Interceptor executed, header added:', request);
    return next(request);
  }
  return next(request);

}
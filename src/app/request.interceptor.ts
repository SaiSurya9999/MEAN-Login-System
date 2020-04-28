import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Request Intercepted');
    function settingHeaders() {
        let token = localStorage.getItem('token');
        if (token) {
            return req.clone({
                headers: req.headers.set('authorization', token.toString())
            });
        } else {
            return req.clone({});
        }
    }

    const cloned = settingHeaders();
    return next.handle(cloned);
  }
}

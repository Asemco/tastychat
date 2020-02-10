import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {

  constructor(
    private userService: UserService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.userService.getToken();

    if (token)
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token)})
    
    if (!request.headers.has('Content-Type'))
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json')})
      
    request = request.clone({ setHeaders: { Accept: 'application/json'}})

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        // For debugging purposes
        // if (event instanceof HttpResponse)
          // console.log('event--->>>', event);
        return event;
      })
    );
  }
}

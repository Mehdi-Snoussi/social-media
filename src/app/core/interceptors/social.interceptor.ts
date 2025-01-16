import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class SocialInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> { 
    return new Observable((observer) => {
      const subscription = next
        .handle( request )
        .subscribe({
          next: () => {
            next.handle(request);
          },
          error: (err) => {
            if (navigator.onLine) console.error(err);
            observer.error(err);
          },
        });
      return () => {
        subscription.unsubscribe();
      };
    });
  }

  addAuthorizationHeaderToRequest(
    request: HttpRequest<unknown>
  ): HttpRequest<unknown> {
    const token = this.authService.getTokenFromCookie();
    if (!token) return request;
    return request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + token),
    });
  }
}

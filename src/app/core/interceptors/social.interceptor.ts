import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class SocialInterceptor implements HttpInterceptor {
  activeRequests = 0;
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.activeRequests === 0) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json'),
      });
      return new Observable((observer) => {
        const subscription = next
          .handle(this.addAuthorizationHeaderToRequest(request))
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
    this.activeRequests++;
    return next.handle(request).pipe();
  }

  addAuthorizationHeaderToRequest(
    request: HttpRequest<unknown>
  ): HttpRequest<unknown> {
    const token = this.authService.getTokenFromCookie();
    if (!token) return request;

    if (!request.url.includes('entreprise')) {
      return request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token),
      });
    } else return request;
  }
}

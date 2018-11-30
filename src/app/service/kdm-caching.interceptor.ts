import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class KDMCachingInterceptor implements HttpInterceptor {
  private cache = {};

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method !== 'GET') {
      return next.handle(request);
    }
    const cachedResponse = this.cache[request.urlWithParams] || null;
    if (cachedResponse) {
      return of(cachedResponse);
    }
    return next.handle(request).pipe(tap(event => {
      if (event instanceof HttpResponse) {
        this.cache[request.urlWithParams] = event;
      }
    }));
  }
}

import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class KDMCachingInterceptor implements HttpInterceptor {
  private cache = {};

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method !== 'GET') {
      return next.handle(request);
    }
    const cachedResponse = this.cache[request.urlWithParams] || null;
    if (cachedResponse) {
      return Observable.of(cachedResponse);
    }
    return next.handle(request).do(event => {
      if (event instanceof HttpResponse) {
        this.cache[request.urlWithParams] = event;
      }
    });
  }
}

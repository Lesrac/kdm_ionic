var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
let KDMCachingInterceptor = class KDMCachingInterceptor {
    constructor() {
        this.cache = {};
    }
    intercept(request, next) {
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
};
KDMCachingInterceptor = __decorate([
    Injectable()
], KDMCachingInterceptor);
export { KDMCachingInterceptor };
//# sourceMappingURL=kdm_caching.interceptor.js.map
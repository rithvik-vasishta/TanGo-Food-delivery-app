import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { TokenStorageService } from '../auth/token-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthHeaderInterceptorService implements HttpInterceptor {
  
  constructor(private tokenStorage:TokenStorageService) { }
  intercept(
    req: HttpRequest<any>, 
    next: HttpHandler): 
    Observable<HttpEvent<any>> {
    const token = this.tokenStorage.getToken();
    const clonedRequest = req.clone({
      headers: req.headers.set(
        'Authorization', token? `Bearer ${token}`: ""
      )
    });
    return next.handle(clonedRequest);
  }
}

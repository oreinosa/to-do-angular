import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request)
      .pipe(
        // retry(1),
        catchError((err: HttpErrorResponse) => {
          const { error } = err;
          let errorMessage = "";
          if (error.status && error.message) {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          } else {
            errorMessage = `Error message: ${error}`;
          }
          return throwError(error);
        })
      )
  }
}
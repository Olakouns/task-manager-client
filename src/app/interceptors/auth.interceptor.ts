import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Router} from "@angular/router";
import {GlobalService} from "../services/global.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private globalService: GlobalService,
    private router: Router,
  ) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.globalService.isAuth()) {
      req = req.clone({
        setHeaders: {
          'Authorization': 'Bearer ' + this.globalService.getAccessToken()
        },
      });
    } else {
      this.router.navigateByUrl('/auth/login').then();
    }
    return next.handle(req);
  }
}

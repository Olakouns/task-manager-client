import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {TokenPayload} from "../payloads/token-payload";
import {Token} from "../payloads/token";
import jwt_decode from "jwt-decode";
import {isPlatformBrowser} from "@angular/common";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: any, public router: Router) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  isAuth() {
    if (!this.isBrowser) return false;

    if (localStorage.getItem("token") == null) {
      return false;
    }
    // const token: Token = this.decryptData(localStorage.getItem("token"));
    const token: Token = JSON.parse(localStorage.getItem("token")!);
    if (token == null) {
      return false;
    }
    try {
      if (token.expiryToken <= new Date().getTime() - 10000) {
        this.logout();
        return false;
      }
      return true;
    } catch (error) {
      this.logout();
      return false;
    }
  }

  logout(admin = false) {
    localStorage.clear()
    // this.profile = null;
    this.router.navigateByUrl("/auth/login").then();

  }

  getError(error: HttpErrorResponse) {
    if (error.status == 0 || error.status == 500) {
      return "An error has occurred";
    } else if (error.status == 401) {
      this.router.navigateByUrl('/auth/login').then();
      return "Not authorized";
    } else {
      return error.error.message ? error.error.message : "An error has occurred";
    }
  }

  getAccessToken() {
    if (!this.isAuth()) {
      return null;
    }
    const token: Token = JSON.parse(localStorage.getItem("token")!);
    try {
      return token.token;
    } catch (error) {
      this.logout();
      return null;
    }
  }
}

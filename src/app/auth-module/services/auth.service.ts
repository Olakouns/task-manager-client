import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Token} from "../../../payloads/token";
import {ApiResponse} from "../../../payloads/api-response";
import {environment} from "../../../environments/environment";
import {LoginRequest} from "../../../payloads/login-request";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public httpClient: HttpClient) {
  }

  login(loginRequest: LoginRequest): Observable<ApiResponse> {
    return this.httpClient
      .post<Token | ApiResponse>(
        `${environment.task_manager.API_URL}/auth/login`,
        loginRequest
      )
      .pipe(
        map((res) => {
          localStorage.setItem("token", JSON.stringify(res));
          let apiResponse = new ApiResponse();
          apiResponse.success = true;
          apiResponse.message = "Login successfully";
          return apiResponse;
        })
      );
  }
}

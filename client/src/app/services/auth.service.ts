import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiUrls} from "../api.urls";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  registerService(registerObj: any) {
    return this.http.post(`${apiUrls.authServiceApi}register`, registerObj);
  }

  loginService(loginObj: any) {
    return this.http.post(`${apiUrls.authServiceApi}login`, loginObj);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}

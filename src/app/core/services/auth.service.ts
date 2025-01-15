import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = environment.urlApi;
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  login(user: any) {
    return this.http.post(this.url + 'user/login', user);
  }

  register(user: any) {
    return this.http.post(this.url + 'user/register', user);
  }

  /* set token in cookies */
  setTokenToCookie(value: string) {
    this.cookieService.delete('token');
    this.cookieService.set('token', value, 365, '/');
  }

  getTokenFromCookie() {
    return this.cookieService.get('token');
  }

  /* set connect user to cookies */
  storeConnectedUserInfoInCookie(value: string) {
    const user = this.decodeUserToken(value);
    const data = JSON.stringify(user);
    this.cookieService.delete('user');
    this.cookieService.set('user', JSON.stringify(data), 365, '/');
  }

  /* get user connected info */
  getUserConnectedInfo() {
    const data = this.cookieService.get('user');
    let result = null;
    if (data) result = JSON.parse(JSON.parse(data));
    return result;
  }

  /* get user from decoded token */
  decodeUserToken(value: string) {
    const jwtHelper = new JwtHelperService();
    return jwtHelper.decodeToken(JSON.stringify(value));
  }

  /*  sheck token validity */
  isAuthenticated(): boolean {
    const jwtHelper = new JwtHelperService();
    const token = this.getTokenFromCookie();
    if (token) return !jwtHelper.isTokenExpired(token);
    else return false;
  }

  /** clear cookies */
  clearCookies() {
    this.cookieService.deleteAll('/');
  }

  /* clear data */
  clearData() {
    localStorage.clear();
    this.clearCookies();
    this.router.navigate(['auth/login']);
  }
}

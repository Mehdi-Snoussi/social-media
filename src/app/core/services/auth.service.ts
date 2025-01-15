import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = environment.urlApi;
  constructor(private http: HttpClient) {}

  login( user : any){
    return this.http.post(this.url + 'login', user );
  }
  
  register(user: any) {
    return this.http.post(this.url + 'register', user);
  }
}

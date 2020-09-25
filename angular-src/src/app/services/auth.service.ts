import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { HttpClient , HttpHeaders} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;
  constructor(private http: HttpClient) { }

  registerUser(user){
    let headers = new HttpHeaders();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:3000/users/register',user,{headers : headers});
  }
  authenticateUser(user){
    let headers = new HttpHeaders();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:3000/users/auth',user,{headers : headers});
  }
  storeUserData(token, user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}

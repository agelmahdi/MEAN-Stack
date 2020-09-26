import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

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
  getProfile(){
    this.loadToken();
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': this.authToken
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.get('http://localhost:3000/users/profile',requestOptions);
  }
  storeUserData(token, user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token =  localStorage.getItem('id_token')
    this.authToken = token
  }
  loggedIn() {    
    return !this.jwtHelper.isTokenExpired();
  }
  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}

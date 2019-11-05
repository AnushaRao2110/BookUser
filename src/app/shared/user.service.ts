import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { User } from './user.model';
import { Login } from './login.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  noauthHeader = { headers: new HttpHeaders({ "noauth": "True" }) };

  selectedUser: User = {
    name: '',
    email: '',
    password: '',
    mobile: null
  };

  loginUser: Login = {
    email: '',
    password: '',
  }

  userDetails={
    name:'',
    email:'',
    mobile:null
  };

  readonly baseUrl = 'http://bookmanserver.herokuapp.com/';

  constructor(private _http: HttpClient) { }

  //http requests

  SignUpUser(nuser: User) {       //http post request
    return this._http.post(this.baseUrl + 'register', nuser,this.noauthHeader);
  }

  LoginUser(data: Login) {
    return this._http.post(this.baseUrl + 'login', data, this.noauthHeader);
  }

  getUserProfile() {
    return this._http.get(this.baseUrl + 'userProfile');
  }


  //Helper functions for JWT Token
  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token) {
    localStorage.setItem('token', token);
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = localStorage.getItem('token');
    if (token) {
      var UserPayload = atob(token.split('.')[1]);
      return JSON.parse(UserPayload);
    }
    else
      return null;
  }

  isloggedIn() {
    var UserPayload = this.getUserPayload();
    if (UserPayload) {
      return UserPayload.exp > Date.now() / 1000;
    }
    else
      return false;
  }

}

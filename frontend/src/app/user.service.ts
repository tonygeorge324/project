import { Injectable } from '@angular/core';
import { User } from './user.model'//model class
import { HttpClient , HttpHeaders} from '@angular/common/http'//connection with node
import { environment } from 'src/environments/environment';//for api base url
@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {//from model class and declared to selectedUser Object
    fullName: '',//empty 
    email: '',
    password: ''
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }//node parameter injection http HttpClient class and import clientModule to app.module.ts

  //HttpMethods

  postUser(user: User){//function postUser single parameter with its type user model User
    return this.http.post(environment.apiBaseUrl+'/register',user,this.noAuthHeader);//we need to save api base url so we need to declare base url in environment
  }//return an observable to subscribe reg.component.ts

  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials,this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }


  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}
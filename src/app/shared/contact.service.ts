import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contact:Contact={
    name:"",
    email:"",
    message:""
  }
  readonly BaseUrl = "http://localhost:3000";

  constructor(private userService:UserService,private http : HttpClient) {

   }

   

   postContact(request:Contact){
     return this.http.post(this.BaseUrl+"/contact",request);
   }


}

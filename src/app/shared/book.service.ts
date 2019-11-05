import { Injectable } from '@angular/core';


import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


import {Book } from './book.model';
import { HttpClient } from '@angular/common/http';
import {Order} from './order.model';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  orders: Order[];
  selectedBook: Book;
  books : Book[];
  currentOrder : Order={
       _id:'',
    bname:'',
    cname:'',
    cemail:'',
    cphone:null,
    caddress:'',
    quan:1,
    bprice:null,
    date: new Date().toDateString()
  };
  readonly baseUrl = "http://bookmanserver.herokuapp.com";

  constructor(private http : HttpClient) { }

  getBooks(){
    return this.http.get(this.baseUrl+"/book");
  }
  getBooksByid(_id:string){
    return this.http.get(this.baseUrl+'/book/'+_id);
    
  }
 
  OrderBook(order:Order){
    return this.http.post(this.baseUrl+"/AddOrder",order);
  }

  
  getOrders(email:string){
    
    return this.http.get(this.baseUrl+'/getOrders/'+email);
  }
 

  deleteOrders(_id:string){
    return this.http.delete(this.baseUrl+'/deleteOrders/'+_id);
  }
  

}

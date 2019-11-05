import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { BookService} from '../shared/book.service';
import { Order } from '../shared/order.model';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {



  constructor(private userService: UserService, private bookService: BookService,private router:Router) { }

  ngOnInit() {
   
    if(this.userService.isloggedIn()){
      this.userService.getUserProfile().subscribe(
        res => {
          this.userService.userDetails = res['user'];
          this.GetOrders();
        },
        err => { }
      );

    }
  }
  GetOrders(){
    this.bookService.getOrders(this.userService.userDetails.email).subscribe(res => {
      this.bookService.orders = res as Order[];
      console.log("FOUND");
    },  
      err => {
        console.log("ERROR RETRIEVING ORDERS");
      });
   
  }

  DeleteOrders(ID:string){
    this.bookService.deleteOrders(ID).subscribe(res=>{
      this.GetOrders();
    })
  }

}



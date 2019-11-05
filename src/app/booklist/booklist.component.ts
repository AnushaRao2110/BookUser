import { Component, OnInit } from '@angular/core';
import { BookService } from "../shared/book.service";
import { Book } from '../shared/book.model';
import { Order } from '../shared/order.model';
import { NgForm} from '@angular/forms';
import { UserService } from '../shared/user.service';


@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit {

  selected: boolean = false;
  ErrorMessage: string = null;
  clicked = null;



  constructor(private bookService: BookService, private userService: UserService) { }

  ngOnInit() {
    this.GetBooks();
  }

  increaseQuan()
  {

    this.bookService.currentOrder.quan = Number(this.bookService.currentOrder.quan)+1;
  }
  decreaseQuan()
  {
    if(this.bookService.currentOrder.quan>1){
      this.bookService.currentOrder.quan = Number(this.bookService.currentOrder.quan)-1;
    }
    
    
  }


  GetBooks() {
    this.bookService.getBooks().subscribe((res) => {
      this.bookService.books = res as Book[];

    })
  }


  Buy(book: Book) {
    this.bookService.getBooksByid(book._id).subscribe(res => {
      this.bookService.selectedBook = res as Book;
      this.selected = true;
    });
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
  }

  OnSubmit(form: NgForm) {
console.log("CONFIRM CLICKED");
    this.bookService.OrderBook(form.value).subscribe(
      res => {
        alert("ORDER CONFIRMED");
        console.log(res);
        setTimeout(() => {

          this.selected = false;
        }, 3000);
        this.resetForm(form);  
      },
      err=>{
        console.log(err);
      })
  }

  
}


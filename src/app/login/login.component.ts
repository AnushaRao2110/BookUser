import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { NgForm } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ServerErrorMessage: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
  }
  
  OnSubmit(form: NgForm) {
    this.userService.LoginUser(form.value).subscribe(
      res => {
        this.resetForm(form);
        this.userService.setToken(res['token']);

       
        this.userService.getUserProfile().subscribe(
          res => {
            console.log("USERPROFILE");
            this.userService.userDetails = res['user'];
           
          },
          err => {
            console.log("ERROR RETRIEVING USER");
           }
        );


        this.router.navigateByUrl('/home');
      },
      err => {
        if (err.status === 401) {
          this.ServerErrorMessage = err.error;
        }
      });
  }
  nav()
  {
    this.router.navigateByUrl('/register');
  }
}

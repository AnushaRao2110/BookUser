import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  
})
export class SignupComponent implements OnInit {

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  showSuccessMessage:boolean;
  serverErrorMessage:string;
  mobile: number;

  constructor(private userService:UserService, private router: Router) { }

  ngOnInit() {
    
  }


  //Reset Form
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
  }
  //Submit Form
  onSubmit(form:NgForm)
  {
    this.userService.SignUpUser(form.value).subscribe(
      res=>{
        this.showSuccessMessage=true; //Now success message is displayed
        setTimeout(() => { this.showSuccessMessage = false; }, 4000);
        this.resetForm(form);                    //resetting the form values after signup
        this.router.navigateByUrl('/login');    
      },
      err=>{
        if (err.status === 422) {
          this.serverErrorMessage = "EMAIL ID ALREADY REGISTERED";
        }
        else {
          this.serverErrorMessage = 'Something went wrong!Please contact the admin. ';
        }
      }
    )
  }

}

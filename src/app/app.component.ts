import { Component } from '@angular/core';
import { UserService } from './shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  constructor(private userService:UserService,private router : Router){}
  logout(){
    this.userService.deleteToken();
    this.router.navigateByUrl('/login');
  }

  

}

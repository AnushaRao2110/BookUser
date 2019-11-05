import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../shared/user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.userService.isloggedIn()) {
      this.router.navigateByUrl('/login');
      this.userService.deleteToken();
      return false;
    }

    this.userService.getUserProfile().subscribe(
      res => {
        this.userService.userDetails = res['user'];
      },
      err => { }
    );
    return true;
  }
}

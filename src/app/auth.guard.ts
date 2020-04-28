import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { LoginService } from './login.service';
import {Router} from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service: LoginService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //Subject Observer is declared as it dont have default value and waits for it
    var subject = new Subject<boolean>();
    //Token is sent in interceptor
    let authenticate = this.service.validateToken();
    authenticate.subscribe(res => {
      subject.next(res);
    });
    subject.subscribe(res => {
      if (!res) {
        this.router.navigate(['/login']);
      }
    });
    return true;
  }

}

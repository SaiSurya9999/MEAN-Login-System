import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { LoginService } from './login.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'login';
  flag:boolean = false;
  constructor(private router: Router, private service: LoginService){
    if(localStorage.getItem('token')){
      this.router.navigate(['/dashboard']);
    }
    this.service.loginStatus.subscribe(res => {
     this.flag = res;
    });
  }
  logout(){
    localStorage.removeItem('token');
   this.service.loginStatus.next(false);
   this.router.navigate(['/login']);
  }
}

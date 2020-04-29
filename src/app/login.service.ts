import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class LoginService {
rootUrl = "http://localhost:3000/api/";
  //Created an Observable with False as default value
  loginStatus = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }

  login(obj){
    return this.http.post(this.rootUrl+'login',obj);
  }

  signup(obj){
    return this.http.post(this.rootUrl+'signup',obj);
  }

  data() {
    return this.http.get(this.rootUrl + 'secured-data');
  }

  validateToken() : Observable<boolean>{
   this.http.get(this.rootUrl+'validation').subscribe(res => {
   let temp:any = res;
   if(temp.result){
  this.loginStatus.next(true)
   }else{
    this.loginStatus.next(false)
   }
   }, err => {
    this.loginStatus.next(false)
   });

   return this.loginStatus;
  }
}

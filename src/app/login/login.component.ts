import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { LoginService } from '../login.service';
import {Router} from "@angular/router"
import swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    'email': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required)
  });
  constructor(private router: Router, private service: LoginService) { }

  ngOnInit(): void {
  }
  login(){
    if(this.form.valid){
      console.log(this.form.value);
      this.service.login(this.form.value).subscribe(res => {
         let temp:any = res;
         if(temp.result){
           this.router.navigate(['/dashboard']);
           console.log(temp);
           localStorage.setItem('token', temp.token);
          swal.fire("Login Authorized!", "Your have successfully Logged IN! (Check Console For JWT Token)", "success");
         }else{
          swal.fire("Invalid Credentials", "Failed Login!", "error");
         }
      }, err => {
        console.log(err);
        swal.fire("Invalid Credentials", "Failed Login!", "error");
      })
    }else{
      this.form.markAllAsTouched();
    }
  }
}

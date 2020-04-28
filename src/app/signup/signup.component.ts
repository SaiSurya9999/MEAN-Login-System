import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import swal from 'sweetalert2';
import {Router} from "@angular/router"
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form = new FormGroup({
    'email': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required)
  });
  constructor(private service: LoginService, private router: Router) { }

  ngOnInit(): void {
  }
  signup(){
    if(this.form.valid){
      console.log(this.form.value);
      this.service.signup(this.form.value).subscribe(res => {
      console.log(res);
      let temp:any = res;
      if(temp.result){
        this.router.navigate(['/login']);
        swal.fire("Signed Up!", "Your have successfully signup!", "success");

      }else{
        swal.fire("Oops", "Failed signup!", "error");
      }
      }, err => {
        console.log(err);
        swal.fire("Oops", "Failed signup!", "error");
      })
    }else{
      this.form.markAllAsTouched();
    }
  }
}

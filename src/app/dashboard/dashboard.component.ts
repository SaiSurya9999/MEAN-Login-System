import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
data:any = "";
  constructor(private service: LoginService) { }

  ngOnInit() {
    this.service.data().subscribe(res => {
      this.data = res;
    });
  }

}

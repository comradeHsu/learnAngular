import {Component, Injectable, OnInit, Inject} from '@angular/core';
import {AuthService} from '../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // providers:[AuthService]
})
export class LoginComponent implements OnInit {
  username = "";
  password = "";
  constructor(@Inject('auth') private service) {
  }

  ngOnInit() {
  }

  onClick() {
    console.log('result is:'+ this.service.login(this.username, this.password));
  }

  onSubmit(formValue) {
    console.log('result is:'+ this.service.login(formValue.login.username,
        formValue.login.password));
  }
}

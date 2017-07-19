import {Component, Injectable, OnInit, Inject} from '@angular/core';
import {AuthService} from '../core/auth.service';
import {Auth} from '../domain/entities';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // providers:[AuthService]
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  auth: Auth;
  constructor(@Inject('auth') private service, private router: Router) {
  }

  ngOnInit() {
  }

  onClick() {
    console.log('result is:' + this.service.login(this.username, this.password));
  }

  onSubmit(formValue) {
    this.service.loginWithCredentials(formValue.login.username, formValue.login.password)
      .then(auth => {
        let redirectUrl = (auth.redirectUrl === null) ? '/' : auth.redirectUrl;
        if (!auth.hasError) {
          this.router.navigate([redirectUrl]);
          localStorage.removeItem('redirectUrl');
        } else {
          this.auth = Object.assign({}, auth);
        }
      });
  }
}

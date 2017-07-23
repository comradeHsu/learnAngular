import {Inject, Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Auth} from '../domain/entities';
import 'rxjs/add/operator/toPromise';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {
  auth: Auth = {user: null, hasError: true, redirectUrl: '', errMsg: 'not logged in'};
  subject: ReplaySubject<Auth> = new ReplaySubject<Auth>(1);
  constructor(private http: Http, @Inject('user') private userService) { }

  getAuth(): Observable<Auth> {
    return this.subject.asObservable();
  }

  unAuth(): void {
    this.auth = Object.assign(
      {},
      this.auth,
      {user: null, hasError: true, redirectUrl: '', errMsg: 'not logged in'});
    this.subject.next(this.auth);
  }
  // loginWithCredentials(username: string, password: string): Promise<Auth> {
  //   return this.userService.findUser(username)
  //     .then(user => {
  //       let auth = new Auth();
  //       localStorage.removeItem('userId');
  //       let redirectUrl = (localStorage.getItem('redirectUrl') === null) ? '/' :
  //         localStorage.getItem('redirectUrl');
  //       auth.redirectUrl = redirectUrl;
  //       if (null === user) {
  //         auth.hasError = true;
  //         auth.errMsg = 'user not found';
  //       } else if ( password === user.password) {
  //         auth.user = Object.assign({}, user);
  //         auth.hasError = false;
  //         localStorage.setItem('userId', user.id);
  //       } else {
  //         auth.hasError = true;
  //         auth.errMsg = 'password not match';
  //       }
  //       return auth;
  //     })
  //     .catch(this.handleError);
  // }
  loginWithCredentials(username: string, password: string): Observable<Auth> {
    return this.userService.findUser(username)
      .map(user => {
        let auth = new Auth();
        if (null === user) {
          auth.user = null;
          auth.hasError = true;
          auth.errMsg = 'user not found';
        } else if ( password === user.password) {
          auth.user = user;
          auth.hasError = false;
          auth.errMsg = null;
        } else {
          auth.user = null;
          auth.hasError = true;
          auth.errMsg = 'password not match';
        }
        this.auth = Object.assign({}, auth);
        this.subject.next(this.auth);
        return this.auth;
      })
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

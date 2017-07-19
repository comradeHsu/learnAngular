import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {User} from '../domain/entities';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  private api_url = 'http://localhost:3000/users';
  constructor(private http: Http) { }

  findUser(username: string): Promise<User> {
    const url = `${this.api_url}/?username=${username}`;
    return this.http.get(url)
      .toPromise()
      .then(res => {
        let users = res.json() as User[];
        return (users.length > 0) ? users[0] : null;
      })
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

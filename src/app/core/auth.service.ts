import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  login(username:string, password:string):boolean{
    if (username === "xuhui"){
      return true;
    }
    return false;
  }
}

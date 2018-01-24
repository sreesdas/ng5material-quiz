import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoginService {


  private isLoggedIn : boolean = false;
  private username : string;

  private user = new BehaviorSubject<string>("");
  currentUser= this.user.asObservable();

  constructor() {
  }

  setLoggedIn(status:boolean){
  	this.isLoggedIn = status;
  }

  getLoggedIn() {
  	return this.isLoggedIn;
  }

  changeLoginName(username: string) {
    this.user.next(username)
  }
}

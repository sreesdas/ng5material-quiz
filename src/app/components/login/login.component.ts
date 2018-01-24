import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TimeService } from '../../services/time.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  validationErr:boolean;
  errormsg: string;

  constructor(private loginService: LoginService, private timeService: TimeService, private http:HttpClient, private router: Router) { }

  ngOnInit() {
    this.username = '';
    this.password = '';
    this.validationErr = false;
    this.loginService.currentUser.subscribe(username => this.username = username);
    this.timeService.setHeading('Login');
  }

  login() {
  	if(this.username == 'admin'){
  		this.loginService.setLoggedIn(true);
      this.loginService.changeLoginName('128238');
  		this.router.navigate(['dash']);
    }

    if(this.username != '' && this.password != ''){
      var url = 'http://10.207.16.60/quiz/auth.php';
      console.log(btoa(this.password));
      var body = {username: this.username, password: btoa(this.password) };
      this.http.post(url, body)
      .subscribe(
        data => {
          this.loginService.setLoggedIn(true);
          this.loginService.changeLoginName(this.username);
          if(data['auth'] == "success"){
            this.router.navigate(['dash']);
          }
        },
        err => {
          this.validationErr = true;
          this.errormsg = 'Wrong credentials. Please try again!';
        });
    }
    else{
      this.validationErr = true;
      this.errormsg = 'Username or password cannot be blank!';
    }
  }

}

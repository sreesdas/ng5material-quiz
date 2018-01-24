import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { TimeService } from '../../services/time.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isStarted = false;
  username: string;
  rules: any = ['Rule 1', 'Rule 2', 'Rule 3'];

  constructor(private router: Router, private loginService: LoginService,
    private http: HttpClient, private timeService: TimeService) { }

  ngOnInit() {
    this.loginService.currentUser.subscribe(username => this.username = username);
    this.timeService.isStarted.subscribe(isstarted => this.isStarted = isstarted);
    this.timeService.setHeading('Rules and Regulations');
  }

  startQuiz() {

    const url = 'http://10.207.16.60/quiz/hasDone.php?cpf=' + this.username;
    this.http.get(url)
    .subscribe(data => {
      if (data["done"] === "no"){
        this.timeService.setStart(true);
        this.router.navigate(['/button']);
      } else {
        alert('You have already done the quiz!');
      }
    });
  }

}

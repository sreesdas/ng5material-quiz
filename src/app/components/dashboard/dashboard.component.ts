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
  rules: any = ['This quiz consists of 20 multiple choice questions',
                'Duration of this quiz is 6 minutes',
                'Once you click the start button, the timer starts',
                'You can go back and change your answers but only before submitting',
                'If you leave the quiz without submitting, your score will be 0'];

  constructor(private router: Router, private loginService: LoginService,
    private http: HttpClient, private timeService: TimeService) { }

  ngOnInit() {
    this.loginService.currentUser.subscribe(username => this.username = username);
    this.timeService.isStarted.subscribe(isstarted => this.isStarted = isstarted);
    this.timeService.setHeading('Rules and Regulations');
  }

  startQuiz() {

    let url = 'http://10.207.16.60/quiz/hasDone.php?cpf=' + this.username;
    this.http.get(url)
    .subscribe(data => {
      if (data["done"] === "no"){
        this.timeService.setStart(true);

        let url = 'http://10.207.16.60/quiz/quizAttended.php?cpf=' + this.username;
        this.http.get(url)
        .subscribe(data => {
          console.log(data);
        });

        this.router.navigate(['/button']);
      } else {
        alert('You have already done the quiz!');
      }
    });

  }

}

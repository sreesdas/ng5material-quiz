import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../../services/score.service';
import { LoginService } from '../../services/login.service';
import { TimeService } from '../../services/time.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {

  score:number = 0;
  username:string;
  isStarted:boolean;

  constructor(private scoreService : ScoreService, private timeService:TimeService, private http:HttpClient, private loginService:LoginService) { }

  ngOnInit() {

  	this.score = this.scoreService.getScore();
  	this.loginService.currentUser.subscribe(user => this.username = user);
    this.loginService.setLoggedIn(false);

  	let url = "http://10.207.16.60/quiz/postScore.php?cpf=" + this.username + "&score=" + this.score;
    console.log(url);
  	this.http.get(url)
  	.subscribe(data => {
      this.timeService.setStart(false);
    });
  }

}

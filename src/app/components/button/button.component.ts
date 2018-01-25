import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { TimeService } from '../../services/time.service';
import { ScoreService } from '../../services/score.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  questions: any;
  userinput: any = [];
  score: number;
  unattended: number;
  isTimeOut: boolean = false;
  hasSubmitted: boolean = false;

  constructor(private http: HttpClient, private timeService: TimeService, private scoreService: ScoreService, private router: Router) {
      this.score = 0;
      this.unattended = 5;
      this.http.get('http://10.207.16.60/quiz/get.php')
      .subscribe( data => this.questions = data );
   }

  ngOnInit() {

    this.timeService.setHeading('Quiz');
    this.timeService.isTimeout.subscribe(status => {
      this.isTimeOut = status
      if(status && !this.hasSubmitted){
        alert("Timeout!");
        for (let each of this.userinput){
          if(each){
            this.score++;
          }
        }
        this.scoreService.setScore(this.score);
        this.router.navigate(['complete']);
      }
    });

  }

  submit(){
    this.hasSubmitted = true;
    for (let each of this.userinput){
      if(each){
        this.score++;
      }
    }
    this.scoreService.setScore(this.score);
    this.router.navigate(['complete']);
  }

  buttonClicked(item, tile){

    for (let each of this.questions[item.id].options)
       each.color = 'white';
  	this.questions[item.id].options[tile.id].color = 'lightblue';

    if(item.cors == tile.id){
      this.userinput[item.id] = true;
    }
    else {
      this.userinput[item.id] = false;
    }

    this.unattended = 5 - this.userinput.length;
    console.log(this.unattended);
    for (let each of this.userinput){
      if(each == null){
        this.unattended++;
        console.log(this.unattended);
      }
    }

  }

}

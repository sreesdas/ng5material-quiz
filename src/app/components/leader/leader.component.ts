import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TimeService } from '../../services/time.service';

@Component({
  selector: 'app-leader',
  templateUrl: './leader.component.html',
  styleUrls: ['./leader.component.scss']
})
export class LeaderComponent implements OnInit {

  top: any;
  people:any;
  maxscore = 0;

  constructor(private http: HttpClient, private timeService: TimeService) { }

  ngOnInit() {

  	this.timeService.setHeading('LeaderBoard');
  	this.http.get('http://10.207.16.60/quiz/getLeaderBoard.php')
  	.subscribe(data => {
  		this.maxscore = data[0]['score'];
  		this.people = data;
  	});
  }

}

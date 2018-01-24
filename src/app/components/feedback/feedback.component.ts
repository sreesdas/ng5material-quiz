import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TimeService } from '../../services/time.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  name: string;
  feedback: string;

  constructor(private http: HttpClient, private timeService: TimeService) { }

  ngOnInit() {
    this.timeService.setHeading('Feedback');
  }

  submit(){
    var url = 'http://10.207.16.60/quiz/postFeedback.php';

    var body = {name: this.name, feedback: this.feedback };
    this.http.post(url, body)
    .subscribe(
      data => {
        alert('Thank you for your feedback!');
        this.name = '';
        this.feedback = '';
      });

  }
}

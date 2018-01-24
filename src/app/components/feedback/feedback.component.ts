import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  name: string;
  feedback: string;

  constructor() { }

  ngOnInit() {
  }

  submit(){
    console.log(this.name, this.feedback);
    alert('Feedback Submitted!')
    this.name = '';
    this.feedback = '';
  }
}

import { Injectable } from '@angular/core';

@Injectable()
export class ScoreService {

  private score: number;

  constructor() { }


  getScore() {
  	return this.score;
  }

  setScore(score: number){
  	this.score = score;
  }

}

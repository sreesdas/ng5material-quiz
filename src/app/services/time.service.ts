import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class TimeService {

  private timeout = new BehaviorSubject<boolean>(false);
  isTimeout = this.timeout.asObservable();

  private start = new BehaviorSubject<boolean>(false);
  isStarted = this.start.asObservable();

  private heading = new BehaviorSubject<string>('Login');
  currentHeading = this.heading.asObservable();


  constructor() { }

  setTimedOut(status: boolean) {
    this.timeout.next(status);
  }

  setStart(status: boolean) {
    this.start.next(status);
  }

  setHeading(heading: string){
    this.heading.next(heading);
  }
}

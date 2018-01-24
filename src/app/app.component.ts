import { Component } from '@angular/core';
import { SimpleTimer } from 'ng2-simple-timer';

import { LoginService } from './services/login.service';
import { TimeService } from './services/time.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  links: any;
  links2: any;
  title = 'Dashboard';
  isVisible = true;
  username: string;
  isStarted = false;

  counter = 360;
  timeleft: string;
  timerId: string;

  constructor(private st: SimpleTimer, private loginService: LoginService, private http: HttpClient,
    private timeService: TimeService, private router: Router) {

    this.links = [{ name: 'Start Quiz', href: '/', icon: 'home' },
                  { name: 'LeaderBoard', href: '/leaderboard', icon: 'school' },
                  { name: 'Contact Us', href: '/contact', icon: 'contacts'  }];

    this.links2 = [{name: 'About Saksham', href: 'http://www.pcra.org/pages/display/219-saksham-2018', icon: 'info' }];

  }

  ngOnInit() {

    this.timeService.currentHeading.subscribe(heading => this.title = heading);

    this.timeService.isStarted.subscribe(status => {

      this.isStarted = status;
      if (status) {
        this.startTimer();
      }

    });

    this.loginService.currentUser.subscribe(username => {

      const url = 'http://10.207.16.60/quiz/getNamefromCpf.php?cpf=' + username;
      this.http.get(url)
      .subscribe(data => {
        this.username = data['name'];
      });

    });
  }

  public toggleSidebar(nav: any) {
    nav.toggle();
  //  this.isVisible = !this.isVisible;
  }

  startTimer() {
    this.counter = 360;
    this.st.newTimer('1sec', 1);
    this.subscribeTimer();
  }

  subscribeTimer() {
    this.timerId = this.st.subscribe('1sec', () => this.callback());
    console.log('timer 0 Subscribed.');
    console.log(this.st.getSubscription());
  }

  callback() {
    this.counter--;
    this.timeleft = Math.floor(this.counter / 60) + ':' + this.counter % 60;

    if (this.counter === 0) {
      this.st.unsubscribe(this.timerId);
      this.timerId = undefined;
      this.timeService.setTimedOut(true);
    }

    if (!this.isStarted && this.counter < 360) {
      this.st.unsubscribe(this.timerId);
      this.timerId = undefined;
    }
  }

  logout() {
    alert('Successfully logged out!');
  }

}

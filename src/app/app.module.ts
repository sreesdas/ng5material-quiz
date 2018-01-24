import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InterceptorModule } from './interceptor.module';
import { MatModule } from './mat.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SimpleTimer } from 'ng2-simple-timer';

import { AuthGuard } from './guards/auth.guard';
import { ButtonComponent } from './components/button/button.component';
import { ContactComponent } from './components/contact/contact.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { LeaderComponent } from './components/leader/leader.component';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login.service';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ScoreComponent } from './components/score/score.component';
import { TimeService } from './services/time.service';
import { ScoreService } from './services/score.service';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    ContactComponent,
    DashboardComponent,
    FeedbackComponent,
    LeaderComponent,
    LoginComponent,
    NotfoundComponent,
    ScoreComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatModule,
    InterceptorModule,
    RouterModule.forRoot([
      {
        path: '',
        component : LoginComponent
      },
      {
        path: 'dash',
        canActivate: [AuthGuard],
        component : DashboardComponent
      },
      {
        path: 'button',
        canActivate: [AuthGuard],
        component : ButtonComponent
      },
      {
        path: 'complete',
        canActivate: [AuthGuard],
        component : ScoreComponent
      },
      {
        path: 'leaderboard',
        component : LeaderComponent
      },
      {
        path: 'contact',
        component : ContactComponent
      },
      {
        path: 'feedback',
        component : FeedbackComponent
      },
      {
        path: '**',
        component : NotfoundComponent
      }
    ])
  ],
  providers: [AuthGuard, LoginService, TimeService, ScoreService, SimpleTimer],
  bootstrap: [AppComponent]
})
export class AppModule { }

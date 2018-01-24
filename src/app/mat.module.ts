import { MatButtonModule, MatButtonToggleModule, MatCheckboxModule, MatCardModule, MatIconModule, MatInputModule, MatFormFieldModule, MatGridListModule,
		 MatListModule,
         MatMenuModule, MatToolbarModule, MatSidenavModule, MatStepperModule } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatIconModule, MatInputModule, MatFormFieldModule, MatGridListModule,
  			MatListModule, MatMenuModule, MatToolbarModule, MatSidenavModule, MatStepperModule],
  exports: [MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatIconModule, MatInputModule, MatFormFieldModule, MatGridListModule,
  			MatListModule, MatMenuModule, MatToolbarModule, MatSidenavModule, MatStepperModule],
})
export class MatModule { }

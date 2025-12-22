import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomepageComponent } from './features/homepage/homepage.component';
import { WizardComponent } from './features/wizard/wizard.component';
import { StepRoleComponent } from './features/wizard/steps/step-role/step-role.component';
import { StepTargetComponent } from './features/wizard/steps/step-target/step-target.component';
import { StepActivityComponent } from './features/wizard/steps/step-activity/step-activity.component';
import { StepGoalComponent } from './features/wizard/steps/step-goal/step-goal.component';
import { ResultComponent } from './features/result/result.component';
import { ChecklistComponent } from './features/result/checklist/checklist.component';
import { WarningsComponent } from './features/result/warnings/warnings.component';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'bio-linkedin/step/role', component: StepRoleComponent },
  { path: 'bio-linkedin/step/target', component: StepTargetComponent },
  { path: 'bio-linkedin/step/activity', component: StepActivityComponent },
  { path: 'bio-linkedin/step/goal', component: StepGoalComponent },
  { path: 'bio-linkedin/result', component: ResultComponent },
  // Redirect legacy routes
  { path: 'step/role', redirectTo: '/bio-linkedin/step/role', pathMatch: 'full' },
  { path: 'step/target', redirectTo: '/bio-linkedin/step/target', pathMatch: 'full' },
  { path: 'step/activity', redirectTo: '/bio-linkedin/step/activity', pathMatch: 'full' },
  { path: 'step/goal', redirectTo: '/bio-linkedin/step/goal', pathMatch: 'full' },
  { path: 'result', redirectTo: '/bio-linkedin/result', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    WizardComponent,
    StepRoleComponent,
    StepTargetComponent,
    StepActivityComponent,
    StepGoalComponent,
    ResultComponent,
    ChecklistComponent,
    WarningsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatStepperModule,
    MatCheckboxModule,
    MatIconModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


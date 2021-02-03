import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { SoftwareComponent } from './software/software.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'apps', component: SoftwareComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class HomeRoutingModule {
}

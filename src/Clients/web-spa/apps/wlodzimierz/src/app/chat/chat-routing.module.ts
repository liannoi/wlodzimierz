import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatComponent } from './chat.component';
import { ChatRouting } from './chat.routing';
import { ProfileComponent } from './users/profile/profile.component';

const routes: Routes = [
  { path: ChatRouting.Root, component: ChatComponent },
  { path: ChatRouting.Profile, component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class ChatRoutingModule {
}

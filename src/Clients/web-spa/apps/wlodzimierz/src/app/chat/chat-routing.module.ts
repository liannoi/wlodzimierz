import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatComponent } from './chat.component';
import { ChatRouting } from './chat.routing';

const routes: Routes = [
  { path: ChatRouting.Root, component: ChatComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class ChatRoutingModule {
}

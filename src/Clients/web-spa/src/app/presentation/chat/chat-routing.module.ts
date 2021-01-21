import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ChatRoutingConstants} from './chat-routing.constants';
import {ChatComponent} from './chat.component';

const routes: Routes = [
  {path: ChatRoutingConstants.Root, component: ChatComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule {
}

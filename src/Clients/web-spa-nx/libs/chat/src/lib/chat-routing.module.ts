import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatComponent } from '@wlodzimierz/chat/src/lib/chat.component';

const routes: Routes = [
  { path: '', component: ChatComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class ChatRoutingModule {
}

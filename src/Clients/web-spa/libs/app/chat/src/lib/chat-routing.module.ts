import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatComponent } from './chat.component';
import { JwtTokenGuard } from '../../../users/src/lib/shared/guards/jwt-token.guard';

const routes: Routes = [
  { path: '', component: ChatComponent, canActivate: [JwtTokenGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class ChatRoutingModule {
}

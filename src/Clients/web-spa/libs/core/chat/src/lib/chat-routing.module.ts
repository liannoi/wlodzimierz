import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatComponent } from './chat.component';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { JwtTokenGuard } from '../../../../app/users/src/lib/shared/guards/jwt-token.guard';

const routes: Routes = [
  { path: '', component: ChatComponent, canActivate: [JwtTokenGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRoutingModule {}

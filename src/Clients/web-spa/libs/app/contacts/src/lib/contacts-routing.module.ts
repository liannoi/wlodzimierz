import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactListComponent } from './contact-list/contact-list.component';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { JwtTokenGuard } from '../../../users/src/lib/shared/guards/jwt-token.guard';
import { ContactCreateComponent } from './contact-create/contact-create.component';

const routes: Routes = [
  { path: '', component: ContactListComponent, canActivate: [JwtTokenGuard] },
  { path: 'create', component: ContactCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule {
}

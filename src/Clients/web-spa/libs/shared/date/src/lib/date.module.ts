import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { DateService } from './services/date.service';

@NgModule({
  imports: [CommonModule],
  providers: [DateService, DatePipe]
})
export class DateModule {
}

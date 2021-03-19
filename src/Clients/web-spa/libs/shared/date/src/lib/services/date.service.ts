import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable()
export class DateService {
  public constructor(private datePipe: DatePipe) {
  }

  public transform(value: Date, format?: string): string {
    return this.datePipe.transform(value, format);
  }

  public toFull(value: Date): string {
    return this.transform(this.normalize(value), 'd.MM.yy - h:mm a');
  }

  public toToday(value: Date): string {
    const normalized = this.normalize(value);

    if (this.isToday(normalized)) return this.transform(normalized, 'h:mm a');
    else if (this.isThisWeek(normalized))
      return this.transform(normalized, 'E');
    else return this.transform(normalized, 'd.MM.yy');
  }

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  private isToday(value: Date): boolean {
    const today = new Date();

    return (
      value.getDate() == today.getDate() &&
      value.getMonth() == today.getMonth() &&
      value.getFullYear() == today.getFullYear()
    );
  }

  private isThisWeek(value: Date): boolean {
    const today = new Date();
    const firstDay = new Date(today.setDate(today.getDate() - today.getDay()));
    const lastDay = new Date(firstDay);
    lastDay.setDate(lastDay.getDate() + 6);

    return value >= firstDay && value <= lastDay;
  }

  private normalize(value: Date): Date {
    const result = new Date(value);
    result.setHours(result.getHours() + 2);

    return result;
  }
}

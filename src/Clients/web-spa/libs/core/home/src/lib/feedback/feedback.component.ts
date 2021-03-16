import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'wlodzimierz-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent {
  public constructor(private titleService: Title) {
    this.titleService.setTitle('Wlodzimierz Feedback');
  }
}

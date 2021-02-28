import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'wlodzimierz-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
}

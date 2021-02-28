import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'wlodzimierz-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  public constructor(private titleService: Title) {
    this.titleService.setTitle('Your contacts - Wlodzimierz');
  }

  public ngOnInit(): void {
  }
}

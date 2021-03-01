import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

import { defaultModel } from '../../../../../shared/storage/src/lib/common/defaults/model.default';
import { Contact } from '../shared/models/contact.model';
import { CreatedNotification } from '../shared/notifications/created.notification';
import { SearchNotification } from '../shared/notifications/search.notification';
import { TypeaheadTools } from '../shared/tools/typeahead.tools';
import { UserModel } from '../../../../users/src/lib/shared/models/user.model';
import { UsersList } from '../../../../users/src/lib/shared/models/users-list.model';

const typeaheadTools: TypeaheadTools = new TypeaheadTools();

@Component({
  selector: 'wlodzimierz-contact-create',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.scss']
})
export class ContactCreateComponent implements OnInit, OnDestroy {
  @Input() public filterable$: Observable<UsersList>;
  @Output() public createContact = new EventEmitter<CreatedNotification>();
  @Output() public searchContact = new EventEmitter<SearchNotification>();
  public formGroup: FormGroup;
  public contact: Contact = defaultModel();

  public get userName(): AbstractControl {
    return this.formGroup.get('userName') as AbstractControl;
  }

  public ngOnInit(): void {
    this.setupForm();
    this.followRequest();
    this.suggestResults();
  }

  public ngOnDestroy(): void {
    typeaheadTools.onDispose();
  }

  public onCreate(): void {
    if (this.formGroup.invalid) return;

    this.createContact.emit({ contact: this.contact });
    this.formGroup.reset();
  }

  public onSearch(input$: Observable<string>) {
    return input$.pipe(
      filter(input => input != ''),
      debounceTime(200),
      distinctUntilChanged(),
      map(userName => typeaheadTools.requestUserName(userName))
    );
  }

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  private setupForm(): void {
    this.formGroup = new FormGroup({
      userName: new FormControl('', [Validators.required])
    });
  }

  private followRequest(): void {
    typeaheadTools.followRequest(value => {
      if (!value) return;

      const user: UserModel = defaultModel();
      user.userName = value;
      this.searchContact.emit({ user });
    });
  }

  private suggestResults(): void {
    this.filterable$.subscribe(value => {
      if (!value || !value.items) return;

      typeaheadTools.response(value.items.map(e => e.userName));
    });
  }
}

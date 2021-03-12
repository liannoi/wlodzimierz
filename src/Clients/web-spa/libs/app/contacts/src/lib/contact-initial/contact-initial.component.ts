import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { defaultModel } from '../../../../../shared/storage/src/lib/common/defaults/model.default';
import { Contact } from '../shared/models/contact.model';
import { CreatedNotification } from '../shared/notifications/created.notification';
import { SearchNotification } from '../shared/notifications/search.notification';
import { TypeaheadTools } from '../shared/tools/typeahead.tools';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserModel } from '../../../../users/src/lib/shared/models/user.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UsersList } from '../../../../users/src/lib/shared/models/users-list.model';

const typeaheadTools: TypeaheadTools = new TypeaheadTools();

@Component({
  selector: 'wlodzimierz-contact-initial',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact-initial.component.html',
  styleUrls: ['./contact-initial.component.scss']
})
export class ContactInitialComponent implements OnInit, OnDestroy {
  @Input() public filterable$: Observable<UsersList>;
  @Output() public createContact = new EventEmitter<CreatedNotification>();
  @Output() public searchContact = new EventEmitter<SearchNotification>();
  public creationForm: FormGroup;
  public contact: Contact = defaultModel();

  public get contactUser(): AbstractControl {
    return this.creationForm.get('contactUser') as AbstractControl;
  }

  public get firstName(): AbstractControl {
    return this.creationForm.get('firstName') as AbstractControl;
  }

  public get lastName(): AbstractControl {
    return this.creationForm.get('lastName') as AbstractControl;
  }

  public get email(): AbstractControl {
    return this.creationForm.get('email') as AbstractControl;
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
    if (this.creationForm.invalid) return;

    this.contact = this.creationForm.getRawValue() as Contact;
    this.contact.contactUser = defaultModel();
    this.contact.contactUser.userName = this.contactUser.value;
    this.createContact.emit({ contact: this.contact });
    this.creationForm.reset();
  }

  public onSearch(input$: Observable<string>) {
    return input$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter((input) => input.length >= 2),
      map((userName) => typeaheadTools.requestUserName(userName))
    );
  }

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  private setupForm(): void {
    this.creationForm = new FormGroup({
      contactUser: new FormControl('', [Validators.required]),
      firstName: new FormControl(this.contact.firstName, [Validators.required]),
      lastName: new FormControl(this.contact.lastName),
      email: new FormControl(this.contact.email, [Validators.required])
    });
  }

  private followRequest(): void {
    typeaheadTools.followRequest((value) => {
      if (!value) return;

      const user: UserModel = defaultModel();
      user.userName = value;
      this.searchContact.emit({ user });
    });
  }

  private suggestResults(): void {
    this.filterable$.subscribe((value) => {
      if (!value || !value.items) return;

      typeaheadTools.response(value.items.map((e) => e.userName));
    });
  }
}

import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import { CreatedNotification } from '../shared/notifications/create/created.notification';
import { ConversationMessage } from '../shared/models/conversation-message.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Conversation } from '../../../../conversations/src/lib/shared/models/conversation.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserModel } from '../../../../users/src/lib/shared/models/user.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { defaultModel } from '../../../../../shared/storage/src/lib/common/defaults/model.default';

@Component({
  selector: 'wlodzimierz-conversation-message-create',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './conversation-message-create.component.html',
  styleUrls: ['./conversation-message-create.component.scss']
})
export class ConversationMessageCreateComponent implements OnInit {
  @Input() public user: UserModel;
  @Input() public conversation: Conversation;
  @Output()
  public createConversationMessage = new EventEmitter<CreatedNotification>();
  public formGroup: FormGroup;
  public messageModel: ConversationMessage = defaultModel();

  public get message(): AbstractControl {
    return this.formGroup.get('message') as AbstractControl;
  }

  public ngOnInit(): void {
    this.setupForm();
  }

  public onSendMessage(): void {
    if (this.formGroup.invalid) {
      return;
    }

    this.emitCreation();
    this.clearForm();
  }

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  private setupForm(): void {
    this.formGroup = new FormGroup({
      message: new FormControl(this.messageModel.message, [
        Validators.required
      ])
    });
  }

  private emitCreation(): void {
    this.messageModel = this.formGroup.getRawValue() as ConversationMessage;
    this.messageModel.conversation = this.conversation;
    this.messageModel.ownerUserId = this.user.userId;
    this.createConversationMessage.emit({ message: this.messageModel });
  }

  private clearForm(): void {
    this.formGroup.reset();
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';

import { ConversationMessage } from '../shared/models/conversation-message.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserModel } from '../../../../users/src/lib/shared/models/user.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { DateService } from '../../../../../shared/date/src/lib/services/date.service';
import { ThemeService } from '../../../../../shared/theme/src/lib/services/theme.service';

@Component({
  selector: 'wlodzimierz-conversation-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './conversation-message.component.html',
  styleUrls: ['./conversation-message.component.scss']
})
export class ConversationMessageComponent implements OnInit {
  @Input() public message: ConversationMessage;
  @Input() public user: UserModel;
  public currentTheme: string;

  public constructor(
    private dateService: DateService,
    private themeService: ThemeService
  ) {
  }

  public get date(): string {
    return this.dateService.toFull(this.message.publish);
  }

  public ngOnInit(): void {
    this.currentTheme = this.themeService.read()?.name ?? '';
  }
}

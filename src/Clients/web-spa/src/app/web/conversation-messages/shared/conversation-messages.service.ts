import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {catchError, takeUntil} from 'rxjs/operators';

import {AbstractService} from '../../../shared/abstract.service';
import {ApiControllers} from '../../../shared/api.constants';
import {CreateCommand} from './commands/create.command';
import {OnCreateHandler} from './commands/on-create.handler';

@Injectable()
export class ConversationMessagesService extends AbstractService {

  public constructor(http: HttpClient) {
    super(http);
  }

  public create(request: CreateCommand, handler: OnCreateHandler): void {
    this.http.post<number>(ApiControllers.ConversationMessages, request)
      .pipe(catchError(this.handleError))
      .pipe(takeUntil(this.stop$))
      .subscribe(id => handler.onCreateSuccess(id), error => handler.onCreateFailed(error));
  }
}

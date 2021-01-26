import { UsernameExtractor } from '@wlodzimierz/application/src/lib/common/extractors/username.extractor';
import { ConversationModel } from '@wlodzimierz/domain/src/lib/models/conversation.model';
import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';

export class UsernameExtractorImpl implements UsernameExtractor {

  public extract(conversation: ConversationModel, user: UserModel): string {
    return conversation.rightUserId === user?.userId ? conversation.leftUser.userName : conversation.rightUser.userName;
  }
}

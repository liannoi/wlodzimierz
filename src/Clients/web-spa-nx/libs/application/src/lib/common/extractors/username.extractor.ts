import { ConversationModel } from '@wlodzimierz/domain/src/lib/models/conversation.model';
import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';

export interface UsernameExtractor {

  extract(conversation: ConversationModel, user: UserModel): string;
}

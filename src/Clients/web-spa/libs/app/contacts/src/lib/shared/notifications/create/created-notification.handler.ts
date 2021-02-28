import { BaseNotification } from '../../../../../../../shared/notifications/src/lib/common/abstractions/base.notification';
import { Contact } from '../../models/contact.model';

export interface CreatedNotificationHandler extends BaseNotification {
  item: Contact;
}

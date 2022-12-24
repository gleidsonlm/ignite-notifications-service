import { Content } from '@app/entities/content';
import { Notification, NotificationProps } from '@app/entities/notifications';
import { randomUUID } from 'node:crypto';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    content: new Content('this is a test notification'),
    category: 'test',
    recipientId: randomUUID(),
    ...override,
  });
}

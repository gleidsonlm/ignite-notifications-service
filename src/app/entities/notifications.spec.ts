import { randomUUID } from 'node:crypto';
import { Content } from './content';
import { Notification } from './notifications';

describe('Notification', () => {
  it('*should* be able to create a notification', () => {
    const notification = new Notification({
      content: new Content('This is a new notification'),
      category: 'test',
      recipientId: randomUUID(),
    });

    expect(notification).toBeInstanceOf(Notification);
  });
});

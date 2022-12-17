import { InMemmoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { SendNotification } from './send-notification';

describe('Send Notification', () => {
  it('should be able to send a notification', async () => {
    const notificationsRepository = new InMemmoryNotificationsRepository();
    const sendNotification = new SendNotification(notificationsRepository);

    await sendNotification.execute({
      content: 'This is a test notification',
      category: 'test',
      recipientId: 'd81f9a31-828d-4bc0-a9e1-6fa8e60c4605',
    });

    expect(notificationsRepository).toHaveLength(1);
  });
});

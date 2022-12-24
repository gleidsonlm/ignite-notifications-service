import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notifications';
import { InMemmoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Cancel Notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemmoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = new Notification({
      content: new Content('This is a test notification'),
      category: 'test',
      recipientId: 'e8daf9b4-aba2-496a-8433-6f86ed539094',
    });

    await notificationsRepository.create(notification);

    await cancelNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non-existing notification', async () => {
    const notificationsRepository = new InMemmoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    expect(
      cancelNotification.execute({ notificationId: 'does-not-exist' }),
    ).rejects.toThrow(NotificationNotFound);
  });
});

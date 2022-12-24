import { makeNotification } from '@test/factories/notification-factory';
import { InMemmoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { randomUUID } from 'node:crypto';
import { CountRecipientsNotifications } from './count-notifications';

describe('Count Notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemmoryNotificationsRepository();
    const countRecipientsNotifications = new CountRecipientsNotifications(
      notificationsRepository,
    );

    const UUID = randomUUID();

    await notificationsRepository.create(
      makeNotification({ recipientId: UUID }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'does-not-exist' }),
    );

    const { count } = await countRecipientsNotifications.execute({
      recipientId: UUID,
    });

    expect(count).toEqual(1);
  });
});

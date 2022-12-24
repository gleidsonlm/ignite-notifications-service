import { makeNotification } from '@test/factories/notification-factory';
import { InMemmoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { randomUUID } from 'node:crypto';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get Notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemmoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
      notificationsRepository,
    );

    const UUID = randomUUID();

    await notificationsRepository.create(
      makeNotification({ recipientId: UUID }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: UUID }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'does-not-exist' }),
    );

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: UUID,
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: UUID }),
        expect.objectContaining({ recipientId: UUID }),
      ]),
    );
  });
});

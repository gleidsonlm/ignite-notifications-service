import { Notification } from '@app/entities/notifications';
import { NotificationsRepository } from '@app/repositories/notifications-repository';

export class InMemmoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];

  async findById(notificationId: string): Promise<Notification> {
    const notification = this.notifications.find(
      (storedNotification) => storedNotification.id === notificationId,
    );

    if (!notification) {
      return null;
    }

    return notification;
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter(
      (storedNotification) => storedNotification.recipientId === recipientId,
    ).length;
  }

  async create(notification: Notification) {
    this.notifications.push(notification);
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (storedNotification) => storedNotification.id === notification.id,
    );

    if (notificationIndex === -1) {
      return null;
    } else if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }
}

import { Notification } from '../entities/notifications';

export abstract class NotificationsRepository {
  abstract findById(id: string): Promise<Notification | null>;
  abstract countManyByRecipientId(recipientId: string): Promise<number>;
  abstract create(notification: Notification): Promise<void>;
  abstract save(notification: Notification): Promise<void>;
}

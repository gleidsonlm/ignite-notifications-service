import { Module } from '@nestjs/common';
import { NotificationsRepository } from '../../app/repositories/notifications-repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaNoticationsRepository } from './prisma/repositories/prisma-notifications-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationsRepository,
      useClass: PrismaNoticationsRepository,
    },
  ],
  exports: [NotificationsRepository],
})
export class DatabaseModule {}

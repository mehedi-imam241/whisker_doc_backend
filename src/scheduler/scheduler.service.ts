import { Injectable, Logger } from '@nestjs/common';
import { HomeServiceService } from '../home_service/home_service.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class SchedulerService {
  constructor(private readonly homeServiceService: HomeServiceService) {}

  private readonly logger = new Logger(SchedulerService.name);

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    const dateTime = new Date();
    const today = new Date(
      dateTime.getFullYear(),
      dateTime.getMonth(),
      dateTime.getDate() + 6,
      0,
      0,
      0,
      0,
    );
    await this.homeServiceService.createDateSchedule(today);

    this.logger.log('Created Date Schedule For Today');
  }
}

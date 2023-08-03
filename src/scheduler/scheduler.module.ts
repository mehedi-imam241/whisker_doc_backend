import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { HomeServiceModule } from '../home_service/home_service.module';

@Module({
  imports: [HomeServiceModule],
  providers: [SchedulerService],
})
export class SchedulerModule {}

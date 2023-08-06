import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { HomeServiceModule } from '../home_service/home_service.module';
import { AppointmentsModule } from '../appointments/appointments.module';

@Module({
  imports: [HomeServiceModule, AppointmentsModule],
  providers: [SchedulerService],
})
export class SchedulerModule {}

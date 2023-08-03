import { Module } from '@nestjs/common';
import { HomeServiceService } from './home_service.service';
import { HomeServiceResolver } from './home_service.resolver';
import { HomeService } from './models/home_service.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slots } from './models/slots.model';
import { Date_schedule } from './models/date_schedule.model';

@Module({
  imports: [TypeOrmModule.forFeature([HomeService, Date_schedule, Slots])],
  providers: [HomeServiceService, HomeServiceResolver],
  exports: [HomeServiceService],
})
export class HomeServiceModule {}

import { Module } from '@nestjs/common';
import { AppointmentsResolver } from './appointments.resolver';
import { AppointmentsService } from './appointments.service';
import { Appointment } from './models/appointment.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment])],
  providers: [AppointmentsResolver, AppointmentsService],
})
export class AppointmentsModule {}
